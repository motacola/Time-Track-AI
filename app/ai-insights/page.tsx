import { Brain } from "lucide-react"

import { Button } from "@/components/ui/button"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { AiInsights } from "@/components/ai-insights"

export default function AiInsightsPage() {
  return (
    <DashboardShell>
      <DashboardHeader heading="AI Insights" text="Discover actionable intelligence from your timesheet data">
        <Button variant="outline" className="gap-2">
          <Brain className="h-4 w-4" />
          Generate New Insights
        </Button>
      </DashboardHeader>
      <div className="grid gap-4">
        <AiInsights />
      </div>
    </DashboardShell>
  )
}
