import Link from "next/link"
import { Suspense } from "react"
import { Keyboard, Mic } from "lucide-react"

import { Button } from "@/components/ui/button"
import { LoadingFallback } from "@/components/ui/loading-fallback"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { DashboardHeader } from "@/components/dashboard-header"
import { NLTimesheetEntry } from "@/components/nl-timesheet-entry"
import NewTimesheetForm from "./new-timesheet-form"

interface PageProps {
  searchParams?: { tab?: string }
}

export default function NewTimesheetPage({ searchParams }: PageProps) {
  const tab = searchParams?.tab === "voice" ? "voice" : "text"

  return (
    <div className="flex flex-col gap-6">
      <DashboardHeader
        heading="New Timesheet Entry"
        text="Capture your hours using voice dictation or the manual form."
      >
        <div className="flex items-center gap-2">
          <Button
            asChild
            size="sm"
            variant={tab === "text" ? "default" : "outline"}
          >
            <Link href="/timesheet/new?tab=text">
              <Keyboard className="mr-2 h-4 w-4" /> Manual Entry
            </Link>
          </Button>
          <Button
            asChild
            size="sm"
            variant={tab === "voice" ? "default" : "outline"}
          >
            <Link href="/timesheet/new?tab=voice">
              <Mic className="mr-2 h-4 w-4" /> Voice Entry
            </Link>
          </Button>
        </div>
      </DashboardHeader>

      {tab === "voice" ? (
        <div className="space-y-4">
          <Alert>
            <AlertTitle>Voice entry tips</AlertTitle>
            <AlertDescription>
              Find a quiet space, speak naturally, and include project names, durations, and key deliverables so the
              assistant can categorise your work accurately.
            </AlertDescription>
          </Alert>
          <NLTimesheetEntry />
        </div>
      ) : (
        <Suspense
          fallback={
            <LoadingFallback title="Loading form" description="Please wait while we prepare the timesheet form" />
          }
        >
          <NewTimesheetForm />
        </Suspense>
      )}
    </div>
  )
}
