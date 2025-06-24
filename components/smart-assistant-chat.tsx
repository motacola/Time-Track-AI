"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Bot, Send, Mic, Briefcase, Clock, Sparkles, Loader2, AlertCircle } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { createUserMessage, createAssistantMessage } from "@/lib/chat-utils"

type Message = {
  id: string
  content: string
  role: "user" | "assistant"
  timestamp: Date
  attachments?: {
    type: "timesheet" | "project" | "report" | "chart"
    data: any
  }[]
}

// Declare the webkitSpeechRecognition variable
declare global {
  interface Window {
    webkitSpeechRecognition: any
    SpeechRecognition: any
  }
}

export function SmartAssistantChat() {
  const [input, setInput] = useState("")
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      content: "Welcome to the AdTrack Smart Assistant powered by Gemini! How can I help you today?",
      role: "assistant",
      timestamp: new Date(),
    },
    {
      id: "suggestions",
      content: "You can ask me to log time, show your projects, generate reports, or provide AI insights.",
      role: "assistant",
      timestamp: new Date(),
    },
  ])
  const [isLoading, setIsLoading] = useState(false)
  const [isListening, setIsListening] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const [conversationId, setConversationId] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [user, setUser] = useState<any>(null)
  const [authChecked, setAuthChecked] = useState(false)
  const [demoMode, setDemoMode] = useState(false)

  // Check authentication on component mount
  useEffect(() => {
    const checkAuth = async () => {
      try {
        console.log("Starting auth check...")

        // Try to import and use Supabase
        try {
          const supabase = (await import("@/lib/supabase/client")).default

          // First, try to get the current session
          const { data: sessionData, error: sessionError } = await supabase.auth.getSession()

          console.log("Session check result:", {
            session: sessionData.session?.user?.email,
            error: sessionError?.message,
          })

          if (sessionError) {
            console.warn("Session error:", sessionError)
            // Don't throw error, fall back to demo mode
            setDemoMode(true)
            setUser({ email: "demo@adtrack.com", id: "demo-user" })
            setError(null)
          } else if (sessionData.session) {
            setUser(sessionData.session.user)
            console.log("User authenticated via session:", sessionData.session.user.email)
            setError(null)
          } else {
            // If no session, try getUser as fallback
            console.log("No session found, trying getUser...")
            const { data: userData, error: userError } = await supabase.auth.getUser()

            if (userError) {
              console.warn("User error:", userError)
              // Fall back to demo mode
              setDemoMode(true)
              setUser({ email: "demo@adtrack.com", id: "demo-user" })
              setError(null)
            } else if (userData.user) {
              setUser(userData.user)
              console.log("User authenticated via getUser:", userData.user.email)
              setError(null)
            } else {
              console.log("No user found, enabling demo mode")
              setDemoMode(true)
              setUser({ email: "demo@adtrack.com", id: "demo-user" })
              setError(null)
            }
          }
        } catch (supabaseError) {
          console.warn("Supabase not available, enabling demo mode:", supabaseError)
          setDemoMode(true)
          setUser({ email: "demo@adtrack.com", id: "demo-user" })
          setError(null)
        }
      } catch (err) {
        console.error("Auth check failed:", err)
        // Fall back to demo mode instead of showing error
        setDemoMode(true)
        setUser({ email: "demo@adtrack.com", id: "demo-user" })
        setError(null)
      } finally {
        setAuthChecked(true)
      }
    }

    checkAuth()
  }, [])

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }, [messages])

  const handleSend = async () => {
    if (input.trim()) {
      try {
        // Add user message
        const userMessage = createUserMessage(input)
        setMessages((prev) => [...prev, userMessage])
        setInput("")
        setIsLoading(true)
        setError(null)

        console.log("Sending message:", input)

        // If in demo mode, provide mock responses
        if (demoMode) {
          // Simulate API delay
          await new Promise((resolve) => setTimeout(resolve, 1000))

          let response = "I'm running in demo mode. "

          // Simple keyword-based responses
          if (input.toLowerCase().includes("time") || input.toLowerCase().includes("log")) {
            response +=
              "I can help you log time entries! In the full version, I would create timesheet entries based on your description."
          } else if (input.toLowerCase().includes("project")) {
            response +=
              "Here are your demo projects: Website Redesign (80% complete), Mobile App (45% complete), Brand Campaign (20% complete)."
          } else if (input.toLowerCase().includes("report")) {
            response +=
              "I can generate reports showing your time tracking data, project progress, and productivity insights."
          } else if (input.toLowerCase().includes("insight")) {
            response +=
              "Based on your demo data: You're most productive on Tuesdays, averaging 7.5 hours. Consider scheduling important tasks then!"
          } else {
            response +=
              "I can help you with time tracking, project management, reports, and AI insights. Try asking about logging time or viewing projects!"
          }

          const assistantMessage = createAssistantMessage(response)
          setMessages((prev) => [...prev, assistantMessage])
        } else {
          // Try to send to real API
          const result = await fetch("/api/chat", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              message: input,
              conversationId: conversationId || undefined,
            }),
          })

          if (!result.ok) {
            const errorData = await result.json()
            throw new Error(errorData.error || `HTTP ${result.status}`)
          }

          const data = await result.json()
          console.log("API response:", data)

          // Set conversation ID if not already set
          if (!conversationId && data.conversationId) {
            setConversationId(data.conversationId)
          }

          // Add assistant response
          const assistantMessage = createAssistantMessage(data.response, data.action)
          setMessages((prev) => [...prev, assistantMessage])
        }
      } catch (err: any) {
        console.error("Chat error:", err)
        setError(`Failed to get a response: ${err.message || "Unknown error"}`)
      } finally {
        setIsLoading(false)
      }
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSend()
    }
  }

  const handleVoiceInput = () => {
    setError("Voice input is temporarily disabled due to connectivity issues. Please type your message instead.")
  }

  const stopListening = () => {
    setIsListening(false)
    setError(null)
  }

  const renderAttachment = (attachment: Message["attachments"][0]) => {
    switch (attachment.type) {
      case "project":
        return (
          <Card className="p-3 mt-2 bg-muted/50 w-full max-w-md">
            <h4 className="text-sm font-medium flex items-center gap-1 mb-2">
              <Briefcase className="h-3.5 w-3.5" /> Your Projects
            </h4>
            <div className="space-y-2">
              {attachment.data.map((project: any, index: number) => (
                <div key={index} className="text-xs border-b pb-2 last:border-0 last:pb-0">
                  <div className="font-medium">{project.name}</div>
                  <div className="flex justify-between text-muted-foreground mt-1">
                    <span>Role: {project.role}</span>
                    <span>Due: {project.deadline}</span>
                  </div>
                  <div className="w-full bg-muted h-1.5 rounded-full mt-1.5">
                    <div className="bg-primary h-1.5 rounded-full" style={{ width: `${project.progress}%` }}></div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        )

      case "timesheet":
        return (
          <Card className="p-3 mt-2 bg-muted/50 w-full max-w-md">
            <h4 className="text-sm font-medium flex items-center gap-1 mb-2">
              <Clock className="h-3.5 w-3.5" /> Weekly Summary
            </h4>
            <div className="grid grid-cols-2 gap-2 mb-2">
              <div className="bg-background rounded p-2 text-center">
                <div className="text-xs text-muted-foreground">Total Hours</div>
                <div className="text-lg font-bold">{attachment.data.totalHours}</div>
              </div>
              <div className="bg-background rounded p-2 text-center">
                <div className="text-xs text-muted-foreground">Billable</div>
                <div className="text-lg font-bold">
                  {attachment.data.billableHours}{" "}
                  <span className="text-xs text-muted-foreground">
                    ({Math.round((attachment.data.billableHours / attachment.data.totalHours) * 100)}%)
                  </span>
                </div>
              </div>
            </div>
            <div className="space-y-1.5 text-xs">
              {attachment.data.projects.map((project: any, index: number) => (
                <div key={index} className="flex justify-between items-center">
                  <span className="truncate max-w-[70%]">{project.name}</span>
                  <div className="flex items-center gap-1">
                    <span className="font-medium">{project.hours}h</span>
                    {project.billable === false && (
                      <span className="text-[10px] bg-muted px-1 rounded">Non-billable</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </Card>
        )

      case "chart":
        return (
          <Card className="p-3 mt-2 bg-muted/50 w-full max-w-md">
            <h4 className="text-sm font-medium flex items-center gap-1 mb-2">
              <Sparkles className="h-3.5 w-3.5" /> {attachment.data.title}
            </h4>
            {attachment.data.prediction && <div className="text-xs mb-2">{attachment.data.prediction}</div>}
            {attachment.data.insights && (
              <ul className="text-xs space-y-1 mb-2">
                {attachment.data.insights.map((insight: string, index: number) => (
                  <li key={index} className="flex items-start gap-1">
                    <span className="text-primary">•</span>
                    <span>{insight}</span>
                  </li>
                ))}
              </ul>
            )}
            {attachment.data.recommendation && (
              <div className="text-xs bg-primary/10 p-2 rounded border border-primary/20 mt-2">
                <span className="font-medium">Recommendation:</span> {attachment.data.recommendation}
              </div>
            )}
          </Card>
        )

      default:
        return null
    }
  }

  // Show loading state while checking auth
  if (!authChecked) {
    return (
      <div className="flex flex-col h-[calc(100vh-13rem)] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin mb-4" />
        <p className="text-muted-foreground">Initializing Smart Assistant...</p>
      </div>
    )
  }

  return (
    <div className="flex flex-col h-[calc(100vh-13rem)]">
      <ScrollArea className="flex-1 p-4">
        <div className="flex flex-col gap-4">
          {user && (
            <div className="text-center text-sm text-muted-foreground mb-4">
              {demoMode ? (
                <div className="flex items-center justify-center gap-2">
                  <span>Demo Mode: {user.email}</span>
                  <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">PREVIEW</span>
                </div>
              ) : (
                <div className="flex items-center justify-center gap-2">
                  <span>Logged in as: {user.email}</span>
                  <span className="text-green-600">● Connected</span>
                </div>
              )}
            </div>
          )}

          {messages.map((message) => (
            <div key={message.id} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
              <div className="flex gap-3 max-w-[80%]">
                {message.role === "assistant" && (
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/placeholder.svg?height=32&width=32" alt="AI Assistant" />
                    <AvatarFallback className="bg-primary/20">
                      <Bot className="h-4 w-4 text-primary" />
                    </AvatarFallback>
                  </Avatar>
                )}
                <div className="flex flex-col gap-1">
                  <div
                    className={`rounded-lg px-3 py-2 text-sm ${
                      message.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted"
                    }`}
                  >
                    {message.content}
                  </div>

                  {message.attachments?.map((attachment, index) => (
                    <div key={index}>{renderAttachment(attachment)}</div>
                  ))}

                  <span className="text-xs text-muted-foreground ml-1">
                    {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                  </span>
                </div>
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex justify-start">
              <div className="flex gap-3 max-w-[80%]">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/placeholder.svg?height=32&width=32" alt="AI Assistant" />
                  <AvatarFallback className="bg-primary/20">
                    <Bot className="h-4 w-4 text-primary" />
                  </AvatarFallback>
                </Avatar>
                <div className="rounded-lg px-3 py-2 text-sm bg-muted">
                  <div className="flex gap-1">
                    <div className="h-2 w-2 rounded-full bg-muted-foreground/40 animate-bounce [animation-delay:-0.3s]"></div>
                    <div className="h-2 w-2 rounded-full bg-muted-foreground/40 animate-bounce [animation-delay:-0.15s]"></div>
                    <div className="h-2 w-2 rounded-full bg-muted-foreground/40 animate-bounce"></div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {error && (
            <Alert variant="destructive" className="py-2 px-3 text-xs">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <div ref={messagesEndRef} />
        </div>
      </ScrollArea>

      <div className="p-4 border-t">
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            className="opacity-50 cursor-not-allowed"
            onClick={handleVoiceInput}
            disabled={true}
            title="Voice input temporarily unavailable"
          >
            <Mic className="h-4 w-4" />
            <span className="sr-only">Voice input unavailable</span>
          </Button>
          <Input
            placeholder="Type a message or use voice input..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1"
            disabled={isListening}
          />
          <Button size="icon" onClick={handleSend} disabled={!input.trim() || isListening}>
            {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
            <span className="sr-only">Send message</span>
          </Button>
        </div>

        {/* Remove the listening indicator since voice is disabled */}
      </div>
    </div>
  )
}
