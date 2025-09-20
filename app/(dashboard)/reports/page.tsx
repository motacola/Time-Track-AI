import { Download } from "lucide-react"

import { Button } from "@/components/ui/button"
import { DashboardHeader } from "@/components/dashboard-header"
import { ReportFilters } from "@/components/report-filters"
import { ReportsList } from "@/components/reports-list"

export default function ReportsPage() {
  return (
    <div className="flex flex-col gap-6">
      <DashboardHeader heading="Reports" text="Generate and analyze reports for your agency">
        <Button>
          <Download className="mr-2 h-4 w-4" />
          Export
        </Button>
      </DashboardHeader>
      <div className="space-y-4">
        <ReportFilters />
        <ReportsList />
      </div>
    </div>
  )
}
