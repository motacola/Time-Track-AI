import { AiPredictions } from "@/components/ai-predictions"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"

export default function AiPredictionsPage() {
  return (
    <DashboardShell>
      <DashboardHeader
        heading="AI Predictions"
        text="AI-powered insights and forecasts to help you plan your work more effectively."
      />

      <AiPredictions />
    </DashboardShell>
  )
}
