"use client"

import { useEffect, useRef, useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Loader2, Sparkles, Mic, Send } from "lucide-react"
import { createClient } from "@/lib/supabase/client"
import { Alert, AlertDescription } from "@/components/ui/alert"

declare global {
  interface Window {
    webkitSpeechRecognition: any
    SpeechRecognition: any
  }
}

export function NLTimesheetEntry() {
  const [input, setInput] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isListening, setIsListening] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [parsedData, setParsedData] = useState<any>(null)
  const [isSpeechSupported, setIsSpeechSupported] = useState(true)
  const [interimTranscript, setInterimTranscript] = useState("")

  const router = useRouter()
  const supabase = createClient()
  const recognitionRef = useRef<any>(null)

  useEffect(() => {
    if (typeof window === "undefined") {
      return
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition

    if (!SpeechRecognition) {
      setIsSpeechSupported(false)
      return
    }

    const recognition = new SpeechRecognition()
    recognition.continuous = false
    recognition.interimResults = true
    recognition.lang = "en-GB"

    recognition.onstart = () => {
      setIsListening(true)
      setError(null)
    }

    recognition.onresult = (event: any) => {
      let finalTranscript = ""
      let interim = ""

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcriptSegment = event.results[i][0].transcript
        if (event.results[i].isFinal) {
          finalTranscript += transcriptSegment
        } else {
          interim += transcriptSegment
        }
      }

      if (finalTranscript) {
        setInput((prev) => {
          const trimmedPrev = prev.trim()
          const combined = trimmedPrev ? `${trimmedPrev} ${finalTranscript.trim()}` : finalTranscript.trim()
          return combined
        })
        setParsedData(null)
        recognition.stop()
      }

      setInterimTranscript(interim)
    }

    recognition.onerror = (event: any) => {
      console.error("Speech recognition error:", event)
      setError("We couldn’t capture that audio. Please try again.")
      setIsListening(false)
      setInterimTranscript("")
    }

    recognition.onend = () => {
      setIsListening(false)
      setInterimTranscript("")
    }

    recognitionRef.current = recognition

    return () => {
      recognition.onresult = null
      recognition.onerror = null
      recognition.onend = null
      recognitionRef.current = null
      recognition.stop()
    }
  }, [])

  const requestMicrophonePermission = async () => {
    if (typeof window === "undefined") {
      return false
    }

    const navAny = navigator as any

    const tryStopTracks = (stream?: MediaStream) => {
      try {
        stream?.getTracks().forEach((track) => track.stop())
      } catch (err) {
        console.warn("Unable to stop mic tracks", err)
      }
    }

    const withLegacyApi = () =>
      new Promise<boolean>((resolve) => {
        const legacyGetUserMedia =
          navAny.getUserMedia || navAny.webkitGetUserMedia || navAny.mozGetUserMedia || navAny.msGetUserMedia

        if (!legacyGetUserMedia) {
          resolve(false)
          return
        }

        legacyGetUserMedia.call(
          navigator,
          { audio: true },
          (stream: MediaStream) => {
            tryStopTracks(stream)
            resolve(true)
          },
          (err: Error) => {
            console.error("Legacy getUserMedia denied:", err)
            resolve(false)
          },
        )
      })

    const requestViaMediaDevices = async () => {
      try {
        if (!navigator.mediaDevices?.getUserMedia) {
          return withLegacyApi()
        }

        const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
        tryStopTracks(stream)
        return true
      } catch (err) {
        console.error("Microphone permission denied:", err)
        return withLegacyApi()
      }
    }

    const granted = await requestViaMediaDevices()

    if (!granted) {
      setError("Microphone access was denied or is unavailable. Please enable it in your browser settings and try again.")
    }

    return granted
  }

  const toggleVoiceInput = async () => {
    if (!isSpeechSupported || !recognitionRef.current) {
      setError("Voice input is not available in this browser. Please type your entry instead.")
      return
    }

    const recognition = recognitionRef.current

    if (isListening) {
      recognition.stop()
      return
    }

    try {
      setError(null)
      const hasPermission = await requestMicrophonePermission()
      if (!hasPermission) {
        return
      }
      try {
        recognition.start()
      } catch (startError) {
        console.warn("Speech recognition start error. Attempting restart.", startError)
        try {
          recognition.stop()
        } catch (stopError) {
          console.warn("Speech recognition stop error", stopError)
        }

        setTimeout(() => {
          try {
            recognition.start()
          } catch (retryError) {
            console.error("Speech recognition retry failed", retryError)
            setError("We couldn’t initialise voice capture. Please refresh or use manual entry.")
            setIsListening(false)
          }
        }, 300)
      }
    } catch (err) {
      console.error("Voice recognition error:", err)
      setError("We couldn’t access your microphone. Please check permissions and try again.")
      setIsListening(false)
    }
  }

  const processInput = async () => {
    if (!input.trim()) {
      setError("Please enter a description of your work")
      return
    }

    try {
      setIsProcessing(true)
      setError(null)

      const response = await fetch("/api/process-timesheet", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ input }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Failed to process input")
      }

      const data = await response.json()
      setParsedData(data.result)
    } catch (err) {
      console.error("Error processing input:", err)
      setError("Failed to process your input. Please try again or use the form directly.")
    } finally {
      setIsProcessing(false)
    }
  }

  const handleSubmit = async () => {
    if (!parsedData || !parsedData.project_id) {
      setError("Please process your input first")
      return
    }

    try {
      setIsSubmitting(true)
      setError(null)

      const { error } = await supabase.from("timesheet_entries").insert([
        {
          project_id: parsedData.project_id,
          description: parsedData.description,
          hours: parsedData.hours,
          date: parsedData.date,
          billable: parsedData.billable,
          job_number: parsedData.job_number,
        },
      ])

      if (error) {
        throw error
      }

      // Reset form and redirect
      setInput("")
      setParsedData(null)
      router.push("/timesheet")
    } catch (err) {
      console.error("Error submitting timesheet:", err)
      setError("Failed to submit timesheet. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleCancel = () => {
    setParsedData(null)
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-xl flex items-center gap-2">
          <Sparkles className="h-5 w-5" />
          Natural Language Time Entry
        </CardTitle>
      </CardHeader>
      <CardContent>
        {error && (
          <Alert variant="destructive" className="mb-4">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {!isSpeechSupported && (
          <Alert className="mb-4">
            <AlertDescription>
              Voice capture requires a Chromium-based browser such as Chrome or Edge. You can still type your entry and
              process it with AI below.
            </AlertDescription>
          </Alert>
        )}

        {!parsedData ? (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="nl-input">Describe your work in natural language</Label>
              <div className="flex gap-2">
                <Textarea
                  id="nl-input"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Example: I spent 3 hours yesterday working on the Acme website redesign"
                  rows={3}
                  disabled={isProcessing || isListening}
                  className="flex-1"
                />
                <Button
                  variant="outline"
                  size="icon"
                  onClick={toggleVoiceInput}
                  disabled={isProcessing || !isSpeechSupported}
                  className={
                    isListening
                      ? "bg-blue-50 text-blue-600 border-blue-200 animate-pulse"
                      : "hover:bg-blue-50 hover:text-blue-600"
                  }
                >
                  <Mic className="h-4 w-4" />
                </Button>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Try phrases like &quot;2 hours on Acme project yesterday&quot; or &quot;4.5 hours on website design for TechCorp today&quot;
              </p>
              {isListening && (
                <p className="text-xs text-blue-600">Listening… speak naturally and we’ll transcribe automatically.</p>
              )}
              {interimTranscript && (
                <p className="rounded-md bg-blue-50 p-3 text-sm text-blue-700">
                  <span className="font-medium">Live transcript:</span> {interimTranscript}
                </p>
              )}
            </div>

            <Button onClick={processInput} disabled={!input.trim() || isProcessing || isListening} className="w-full">
              {isProcessing ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  <Sparkles className="mr-2 h-4 w-4" />
                  Process Input
                </>
              )}
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="bg-muted/50 p-4 rounded-lg">
              <h3 className="font-medium mb-2">Parsed Information</h3>
              <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
                <div className="text-muted-foreground">Project:</div>
                <div>{parsedData.project_name || "Unknown"}</div>

                <div className="text-muted-foreground">Hours:</div>
                <div>{parsedData.hours}</div>

                <div className="text-muted-foreground">Date:</div>
                <div>{parsedData.date}</div>

                <div className="text-muted-foreground">Billable:</div>
                <div>{parsedData.billable ? "Yes" : "No"}</div>

                <div className="text-muted-foreground">Job Number:</div>
                <div>{parsedData.job_number || "N/A"}</div>

                <div className="text-muted-foreground">Description:</div>
                <div>{parsedData.description}</div>
              </div>
            </div>

            <div className="flex gap-2 justify-end">
              <Button variant="outline" onClick={handleCancel} disabled={isSubmitting}>
                Cancel
              </Button>
              <Button onClick={handleSubmit} disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  <>
                    <Send className="mr-2 h-4 w-4" />
                    Submit Timesheet
                  </>
                )}
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
