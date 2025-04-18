import { Download, RefreshCw } from "lucide-react"

import { Button } from "@/components/ui/button"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AiPredictions } from "@/components/ai-predictions"

export default function AiPredictionsPage() {
  return (
    <DashboardShell>
      <DashboardHeader heading="AI Predictions" text="Forecast project timelines, resource needs, and revenue">
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2">
            <RefreshCw className="h-4 w-4" />
            Refresh Predictions
          </Button>
          <Button variant="outline" className="gap-2">
            <Download className="h-4 w-4" />
            Export
          </Button>
        </div>
      </DashboardHeader>

      <Tabs defaultValue="timeline" className="space-y-4">
        <TabsList>
          <TabsTrigger value="timeline">Project Timelines</TabsTrigger>
          <TabsTrigger value="resources">Resource Allocation</TabsTrigger>
          <TabsTrigger value="revenue">Revenue Forecasting</TabsTrigger>
          <TabsTrigger value="trends">Industry Trends</TabsTrigger>
        </TabsList>

        <TabsContent value="timeline" className="space-y-4">
          <AiPredictions type="timeline" />
        </TabsContent>

        <TabsContent value="resources" className="space-y-4">
          <AiPredictions type="resources" />
        </TabsContent>

        <TabsContent value="revenue" className="space-y-4">
          <AiPredictions type="revenue" />
        </TabsContent>

        <TabsContent value="trends" className="space-y-4">
          <AiPredictions type="trends" />
        </TabsContent>
      </Tabs>
    </DashboardShell>
  )
}
