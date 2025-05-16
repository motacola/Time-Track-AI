import { Suspense } from "react"
import { createClient } from "@/lib/supabase/server"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { DashboardContent } from "./dashboard-content"
import { LoadingFallback } from "@/components/ui/loading-fallback"

// Helper function to add delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

export default async function DashboardPage() {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)

  // Check if user is authenticated
  const { data: sessionData, error: sessionError } = await supabase.auth.getSession()

  if (sessionError) {
    console.error("Session error:", sessionError.message)
    redirect("/login?error=session")
  }

  if (!sessionData.session) {
    // User is not logged in, redirect to login
    redirect("/login")
  }

  // Initialize variables for data
  let timesheetEntries: any[] = []
  let projects: any[] = []
  let errorMessage: string | null = null

  try {
    // Fetch timesheet entries with retry logic
    let entriesError = null
    for (let attempt = 0; attempt < 3; attempt++) {
      try {
        // Add a small delay between retries to avoid rate limiting
        if (attempt > 0) await delay(1000 * attempt)

        const { data, error } = await supabase
          .from("timesheet_entries")
          .select("*, projects(name, job_number, clients(name))")
          .eq("user_id", sessionData.session.user.id)
          .order("date", { ascending: false })
          .limit(5)

        if (error) throw error

        timesheetEntries = data || []
        entriesError = null
        break // Success, exit retry loop
      } catch (error) {
        entriesError = error
        console.error(`Error fetching timesheet entries (attempt ${attempt + 1}):`, error)
      }
    }

    // If we still have an error after retries, set the error message
    if (entriesError) {
      errorMessage = "Unable to load timesheet entries. Please try again later."
    }

    // Wait a moment before making the second request to avoid rate limiting
    await delay(500)

    // Fetch projects with retry logic
    let projectsError = null
    for (let attempt = 0; attempt < 3; attempt++) {
      try {
        // Add a small delay between retries to avoid rate limiting
        if (attempt > 0) await delay(1000 * attempt)

        const { data, error } = await supabase.from("projects").select("*, clients(name)").order("name").limit(10)

        if (error) throw error

        projects = data || []
        projectsError = null
        break // Success, exit retry loop
      } catch (error) {
        projectsError = error
        console.error(`Error fetching projects (attempt ${attempt + 1}):`, error)
      }
    }

    // If we still have an error after retries, update the error message
    if (projectsError) {
      errorMessage = errorMessage
        ? "Unable to load dashboard data. Please try again later."
        : "Unable to load projects. Please try again later."
    }
  } catch (error) {
    console.error("Unexpected error in dashboard:", error)
    errorMessage = "An unexpected error occurred. Please try again later."
  }

  // Return the dashboard content with whatever data we were able to fetch
  return (
    <Suspense fallback={<LoadingFallback title="Loading dashboard" />}>
      <DashboardContent timesheetEntries={timesheetEntries} projects={projects} error={errorMessage} />
    </Suspense>
  )
}
