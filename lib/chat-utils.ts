import { nanoid } from "nanoid"

export interface ChatMessage {
  id: string
  content: string
  role: "user" | "assistant"
  timestamp: Date
  attachments?: {
    type: "timesheet" | "project" | "report" | "chart"
    data: any
  }[]
}

export function createUserMessage(content: string): ChatMessage {
  return {
    id: nanoid(),
    content,
    role: "user",
    timestamp: new Date(),
  }
}

export function createAssistantMessage(content: string, action?: any): ChatMessage {
  return {
    id: nanoid(),
    content,
    role: "assistant",
    timestamp: new Date(),
    ...(action && { attachments: [{ type: "timesheet", data: action }] }),
  }
}

export async function sendChatMessage(message: string, conversationId?: string) {
  console.log("Sending chat message:", { message, conversationId })

  const response = await fetch("/api/chat", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      message,
      conversationId,
    }),
  })

  console.log("Chat API response status:", response.status)

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ error: "Unknown error" }))
    console.error("Chat API error:", errorData)
    throw new Error(errorData.error || `HTTP ${response.status}`)
  }

  const data = await response.json()
  console.log("Chat API response data:", data)
  return data
}

// Additional utility functions for chat functionality
export function formatChatMessage(message: string): string {
  return message.trim()
}

export function validateChatInput(input: any): boolean {
  return typeof input === "string" && input.length > 0 && input.trim().length > 0
}

export function extractTimesheetAction(response: string) {
  try {
    const actionMatch = response.match(/```json\n([\s\S]*?)\n```/)
    if (!actionMatch) return null

    const actionJson = actionMatch[1]
    return JSON.parse(actionJson)
  } catch (error) {
    console.error("Error extracting timesheet action:", error)
    return null
  }
}

export function formatTimestamp(date: Date): string {
  return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
}

export function isRecentMessage(timestamp: Date, minutesThreshold = 5): boolean {
  const now = new Date()
  const diffInMinutes = (now.getTime() - timestamp.getTime()) / (1000 * 60)
  return diffInMinutes <= minutesThreshold
}
