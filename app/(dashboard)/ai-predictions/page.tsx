import { AiPredictions } from "@/components/ai-predictions"
import { DashboardHeader } from "@/components/dashboard-header"

export default function AiPredictionsPage() {
  return (
    <div className="flex flex-col gap-6">
      <DashboardHeader
        heading="AI Predictions"
        text="AI-powered insights and forecasts to help you plan your work more effectively."
      />

      <AiPredictions />
    </div>
  )
}
