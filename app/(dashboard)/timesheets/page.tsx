import { Plus } from "lucide-react"

import { Button } from "@/components/ui/button"
import { DashboardHeader } from "@/components/dashboard-header"
import { TimesheetList } from "@/components/timesheet-list"
import { TimesheetSearch } from "@/components/timesheet-search"

export default function TimesheetsPage() {
  return (
    <div className="flex flex-col gap-6">
      <DashboardHeader heading="Timesheets" text="Manage and track your time entries">
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          New Entry
        </Button>
      </DashboardHeader>
      <div className="space-y-4">
        <TimesheetSearch />
        <TimesheetList />
      </div>
    </div>
  )
}
