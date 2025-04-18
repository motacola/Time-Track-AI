"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Bot, Send, Mic, X, Maximize2, Minimize2, ChevronRight, Clock, Calendar, Briefcase } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"

type Message = {
  id: string
  content: string
  role: "user" | "assistant"
  timestamp: Date
}

type SuggestionType = {
  id: string
  text: string
  icon?: React.ReactNode
}

export function AiChatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [input, setInput] = useState("")
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: "Hi there! I'm your AdTrack assistant. How can I help you with your timesheets today?",
      role: "assistant",
      timestamp: new Date(),
    },
  ])
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const suggestions: SuggestionType[] = [
    {
      id: "1",
      text: "Log time for today",
      icon: <Clock className="h-4 w-4" />,
    },
    {
      id: "2",
      text: "Show my weekly summary",
      icon: <Calendar className="h-4 w-4" />,
    },
    {
      id: "3",
      text: "Which projects am I assigned to?",
      icon: <Briefcase className="h-4 w-4" />,
    },
  ]

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }, [messages])

  const handleSend = () => {
    if (input.trim()) {
      // Add user message
      const userMessage: Message = {
        id: Date.now().toString(),
        content: input,
        role: "user",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, userMessage])
      setInput("")
      setIsLoading(true)

      // Simulate AI response
      setTimeout(() => {
        let response = ""

        // Simple pattern matching for demo purposes
        const lowerInput = input.toLowerCase()

        if (lowerInput.includes("log time") || lowerInput.includes("add hours") || lowerInput.includes("timesheet")) {
          response =
            "I can help you log your time! What project did you work on, and how many hours would you like to log?"
        } else if (lowerInput.includes("summary") || lowerInput.includes("report") || lowerInput.includes("overview")) {
          response =
            "This week you've logged 32 hours across 4 projects. Your most active project is 'Website Redesign - Acme Corp' with 12 hours."
        } else if (lowerInput.includes("project") || lowerInput.includes("assigned")) {
          response =
            "You're currently assigned to 3 active projects: 'Website Redesign - Acme Corp', 'Social Media Campaign - TechStart', and 'Brand Identity - FreshFoods'."
        } else if (lowerInput.includes("deadline") || lowerInput.includes("due")) {
          response =
            "Your next deadline is for 'Website Redesign - Acme Corp' on October 15, 2024 (5 days from now). The project is currently 75% complete."
        } else if (lowerInput.includes("help") || lowerInput.includes("how to")) {
          response =
            "I can help you log time, view project information, check deadlines, and generate reports. Just let me know what you need!"
        } else {
          response =
            "I'm not sure I understand. Would you like help with logging time, checking project status, or viewing reports?"
        }

        const assistantMessage: Message = {
          id: (Date.now() + 1).toString(),
          content: response,
          role: "assistant",
          timestamp: new Date(),
        }

        setMessages((prev) => [...prev, assistantMessage])
        setIsLoading(false)
      }, 1000)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSend()
    }
  }

  const handleSuggestionClick = (suggestion: string) => {
    setInput(suggestion)
    // Auto-send after a short delay to make it feel natural
    setTimeout(() => {
      handleSend()
    }, 300)
  }

  const toggleChatbot = () => {
    setIsOpen(!isOpen)
    setIsMinimized(false)
  }

  const toggleMinimize = () => {
    setIsMinimized(!isMinimized)
  }

  return (
    <>
      {/* Floating button when chatbot is closed */}
      {!isOpen && (
        <Button onClick={toggleChatbot} className="fixed bottom-4 right-4 h-12 w-12 rounded-full shadow-lg" size="icon">
          <Bot className="h-6 w-6" />
        </Button>
      )}

      {/* Chatbot interface */}
      {isOpen && (
        <Card
          className={cn(
            "fixed transition-all duration-300 shadow-lg border-primary/10",
            isMinimized
              ? "bottom-4 right-4 h-14 w-64"
              : "bottom-4 right-4 w-80 md:w-96 h-[600px] max-h-[calc(100vh-2rem)]",
          )}
        >
          {/* Header */}
          <CardHeader className="flex flex-row items-center justify-between p-3 bg-primary/5">
            <div className="flex items-center gap-2">
              <Avatar className="h-8 w-8">
                <AvatarImage src="/placeholder.svg?height=32&width=32" alt="AI Assistant" />
                <AvatarFallback className="bg-primary/20">
                  <Bot className="h-4 w-4 text-primary" />
                </AvatarFallback>
              </Avatar>
              <div className="font-medium">AdTrack Assistant</div>
            </div>
            <div className="flex items-center gap-1">
              <Button variant="ghost" size="icon" className="h-8 w-8" onClick={toggleMinimize}>
                {isMinimized ? <Maximize2 className="h-4 w-4" /> : <Minimize2 className="h-4 w-4" />}
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8" onClick={toggleChatbot}>
                <X className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>

          {/* Content */}
          {!isMinimized && (
            <>
              <CardContent className="p-0">
                <ScrollArea className="h-[calc(600px-8rem)] max-h-[calc(100vh-12rem)]">
                  <div className="flex flex-col gap-3 p-4">
                    {messages.map((message) => (
                      <div
                        key={message.id}
                        className={cn(
                          "flex w-max max-w-[80%] flex-col gap-2 rounded-lg px-3 py-2 text-sm",
                          message.role === "user" ? "ml-auto bg-primary text-primary-foreground" : "bg-muted",
                        )}
                      >
                        {message.content}
                      </div>
                    ))}
                    {isLoading && (
                      <div className="flex w-max max-w-[80%] flex-col gap-2 rounded-lg px-3 py-2 text-sm bg-muted">
                        <div className="flex gap-1">
                          <div className="h-2 w-2 rounded-full bg-muted-foreground/40 animate-bounce [animation-delay:-0.3s]"></div>
                          <div className="h-2 w-2 rounded-full bg-muted-foreground/40 animate-bounce [animation-delay:-0.15s]"></div>
                          <div className="h-2 w-2 rounded-full bg-muted-foreground/40 animate-bounce"></div>
                        </div>
                      </div>
                    )}
                    <div ref={messagesEndRef} />
                  </div>
                </ScrollArea>

                {/* Suggestions */}
                {messages.length < 3 && (
                  <div className="px-4 pb-2">
                    <p className="text-xs text-muted-foreground mb-2">Suggested questions:</p>
                    <div className="flex flex-wrap gap-2">
                      {suggestions.map((suggestion) => (
                        <Button
                          key={suggestion.id}
                          variant="outline"
                          size="sm"
                          className="h-auto py-1.5 px-2 text-xs"
                          onClick={() => handleSuggestionClick(suggestion.text)}
                        >
                          {suggestion.icon && <span className="mr-1">{suggestion.icon}</span>}
                          {suggestion.text}
                          <ChevronRight className="ml-1 h-3 w-3" />
                        </Button>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>

              <CardFooter className="p-3 pt-0">
                <div className="flex w-full items-center gap-2">
                  <Button variant="outline" size="icon" className="shrink-0">
                    <Mic className="h-4 w-4" />
                    <span className="sr-only">Use voice input</span>
                  </Button>
                  <Input
                    placeholder="Ask me anything about timesheets..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="flex-1"
                  />
                  <Button size="icon" className="shrink-0" onClick={handleSend} disabled={!input.trim()}>
                    <Send className="h-4 w-4" />
                    <span className="sr-only">Send message</span>
                  </Button>
                </div>
              </CardFooter>
            </>
          )}
        </Card>
      )}
    </>
  )
}
