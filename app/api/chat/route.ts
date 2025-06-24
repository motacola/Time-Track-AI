import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"
import { Configuration, OpenAIApi } from "openai"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ""
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""
const openaiApiKey = process.env.OPENAI_API_KEY || ""

const supabase = createClient(supabaseUrl, supabaseKey)

const configuration = new Configuration({
  apiKey: openaiApiKey,
})
const openai = new OpenAIApi(configuration)

export async function POST(req: NextRequest) {
  // Check authentication
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser()

  if (authError || !user) {
    console.error("Authentication error:", authError?.message)
    return NextResponse.json({ error: "Unauthorized - Please log in to use the chat feature" }, { status: 401 })
  }

  try {
    const { message } = await req.json()

    // Add user context to the message processing
    const userContext = {
      userId: user.id,
      email: user.email,
      // Add any other relevant user info
    }

    const prompt = `You are a helpful AI assistant. The user is: ${userContext.email}. Answer the question as accurately as possible.\n\n${message}`

    const completion = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: prompt,
      max_tokens: 200,
      temperature: 0.7,
      n: 1,
      stop: ["\n"],
    })

    const aiResponse = completion.data.choices[0].text

    return NextResponse.json({ response: aiResponse })
  } catch (error: any) {
    console.error("Error processing request:", error)

    if (error.response) {
      console.error("OpenAI API error:", error.response.status, error.response.data)
      return NextResponse.json(
        { error: `OpenAI API Error: ${error.response.status} - ${error.response.data}` },
        { status: 500 },
      )
    } else if (error.message === "Unauthorized - Please log in to use the chat feature") {
      return NextResponse.json({ error: "Unauthorized - Please log in to use the chat feature" }, { status: 401 })
    } else {
      return NextResponse.json({ error: "Internal server error" }, { status: 500 })
    }
  }
}
