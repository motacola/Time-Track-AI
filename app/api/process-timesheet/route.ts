import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"
import { cookies } from "next/headers"
import { logger } from "@/lib/logger"
import { nanoid } from "nanoid"

export async function POST(request: NextRequest) {
  const requestId = request.headers.get("x-request-id") || nanoid()

  try {
    logger.info("Processing timesheet request", { requestId, path: "/api/process-timesheet" })

    // Get the input from the request body
    const body = await request.json().catch((error) => {
      logger.error("Failed to parse request body", error, { requestId })
      return {}
    })

    const { input, projectId } = body

    if (!input) {
      logger.warn("Missing input in request", { requestId })
      return NextResponse.json({ error: "Input is required" }, { status: 400 })
    }

    // Get the user from the session
    const supabase = createClient(cookies())
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser()

    if (userError || !user) {
      logger.warn("Unauthorized request", {
        requestId,
        error: userError?.message,
        hasUser: !!user,
      })
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    logger.info("User authenticated", {
      requestId,
      userId: user.id,
      email: user.email,
    })

    // Fetch projects for context
    logger.debug("Fetching projects", { requestId, userId: user.id })
    const { data: projects, error: projectsError } = await supabase
      .from("projects")
      .select("id, name, job_number, client_id, clients(name)")

    if (projectsError) {
      logger.error("Error fetching projects", new Error(projectsError.message), {
        requestId,
        userId: user.id,
        code: projectsError.code,
      })
      return NextResponse.json({ error: "Failed to fetch projects" }, { status: 500 })
    }

    logger.debug("Projects fetched successfully", {
      requestId,
      userId: user.id,
      count: projects?.length || 0,
    })

    // Fetch recent timesheet entries for better context
    logger.debug("Fetching recent timesheet entries", { requestId, userId: user.id })
    const { data: recentEntries, error: entriesError } = await supabase
      .from("timesheet_entries")
      .select("*, projects(name, job_number, clients(name))")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false })
      .limit(10)

    if (entriesError) {
      logger.error("Error fetching recent entries", new Error(entriesError.message), {
        requestId,
        userId: user.id,
        code: entriesError.code,
      })
    }

    logger.debug("Recent entries fetched successfully", {
      requestId,
      userId: user.id,
      count: recentEntries?.length || 0,
    })

    // Format projects for the prompt
    const projectsContext = (projects || []).map((p) => ({
      id: p.id,
      name: p.name,
      job_number: p.job_number || `JOB-${p.id.substring(0, 6)}`,
      client: p.clients?.name || "Unknown client",
    }))

    // Format recent entries for context
    const recentEntriesContext = (recentEntries || []).map((entry) => ({
      project: entry.projects?.name || "No project",
      job_number: entry.job_number || entry.projects?.job_number || "",
      client: entry.projects?.clients?.name || "Unknown client",
      hours: entry.hours,
      description: entry.description,
      date: entry.date,
    }))

    // Create a prompt for the AI
    logger.debug("Creating AI prompt", { requestId, userId: user.id, inputLength: input.length })

    const prompt = `
    You are an AI assistant that helps users log their time for work. Parse the following input and extract:
    1. Project name and ID (if mentioned)
    2. Hours worked (default to 1 if not specified)
    3. Date (default to today if not specified)
    4. Whether the work is billable (default to true)
    5. A cleaned up description of the work
    6. Job number (if mentioned or if it can be matched to a project)

    Here are the available projects:
    ${JSON.stringify(projectsContext)}

    Here are the user's recent timesheet entries for context:
    ${JSON.stringify(recentEntriesContext)}

    If a project is mentioned but doesn't exactly match any in the list, find the closest match.
    If no project is mentioned, ${projectId ? `use the project with ID "${projectId}"` : "leave it blank"}.
    
    Use the user's recent entries to better understand their work patterns and terminology.
    If the user mentions a client name but not a project, try to match it to the appropriate project.
    If the user mentions a job number, match it to the corresponding project.
    
    User input: "${input}"

    Respond with a JSON object with these fields:
    {
      "project_id": "uuid or null if no match",
      "project_name": "name of the project or null if no match",
      "job_number": "job number or null if no match",
      "hours": number,
      "date": "YYYY-MM-DD",
      "billable": boolean,
      "description": "cleaned description"
    }
    `

    try {
      // Call Groq API
      logger.info("Calling Groq API", { requestId, userId: user.id })

      const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
        },
        body: JSON.stringify({
          model: "llama3-70b-8192",
          messages: [
            {
              role: "system",
              content: "You are a helpful assistant that extracts timesheet information from text.",
            },
            {
              role: "user",
              content: prompt,
            },
          ],
          temperature: 0.2,
          max_tokens: 1000,
        }),
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: "Unknown error" }))
        logger.error("Groq API error", new Error(JSON.stringify(errorData)), {
          requestId,
          userId: user.id,
          status: response.status,
          statusText: response.statusText,
        })
        return NextResponse.json({ error: "Failed to process with AI" }, { status: 500 })
      }

      const data = await response.json()
      const aiResponse = data.choices[0].message.content

      logger.debug("Received AI response", {
        requestId,
        userId: user.id,
        responseLength: aiResponse.length,
      })

      // Parse the JSON from the AI response
      let result
      try {
        // Extract JSON from the response (it might be wrapped in markdown code blocks)
        const jsonMatch =
          aiResponse.match(/```json\n([\s\S]*?)\n```/) ||
          aiResponse.match(/```\n([\s\S]*?)\n```/) ||
          aiResponse.match(/{[\s\S]*?}/)

        const jsonString = jsonMatch ? jsonMatch[1] || jsonMatch[0] : aiResponse

        logger.debug("Extracted JSON string", {
          requestId,
          userId: user.id,
          jsonStringLength: jsonString.length,
        })

        result = JSON.parse(jsonString.replace(/^```json|```$/g, "").trim())

        // Ensure the date is in YYYY-MM-DD format
        if (result.date) {
          const date = new Date(result.date)
          if (!isNaN(date.getTime())) {
            result.date = date.toISOString().split("T")[0]
          } else {
            logger.warn("Invalid date format, using today", {
              requestId,
              userId: user.id,
              invalidDate: result.date,
            })
            result.date = new Date().toISOString().split("T")[0]
          }
        } else {
          logger.debug("No date provided, using today", { requestId, userId: user.id })
          result.date = new Date().toISOString().split("T")[0]
        }

        // Ensure hours is a number
        if (typeof result.hours === "string") {
          const parsedHours = Number.parseFloat(result.hours)
          if (isNaN(parsedHours)) {
            logger.warn("Invalid hours format, using default", {
              requestId,
              userId: user.id,
              invalidHours: result.hours,
            })
            result.hours = 1
          } else {
            result.hours = parsedHours
          }
        }

        // Default billable to true if not specified
        if (result.billable === undefined) {
          logger.debug("No billable status provided, using default", { requestId, userId: user.id })
          result.billable = true
        }

        logger.info("Successfully processed timesheet entry", {
          requestId,
          userId: user.id,
          projectId: result.project_id,
          hours: result.hours,
          date: result.date,
        })
      } catch (error) {
        logger.error("Error parsing AI response", error as Error, {
          requestId,
          userId: user.id,
          aiResponse,
        })
        return NextResponse.json({ error: "Failed to parse AI response" }, { status: 500 })
      }

      return NextResponse.json({ result })
    } catch (error) {
      logger.error("Error calling Groq API", error as Error, { requestId, userId: user.id })
      return NextResponse.json({ error: "Failed to process with AI" }, { status: 500 })
    }
  } catch (error) {
    logger.error("Unexpected error processing timesheet", error as Error, { requestId })
    return NextResponse.json({ error: "An unexpected error occurred" }, { status: 500 })
  }
}
