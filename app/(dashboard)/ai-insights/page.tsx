import { AiInsights } from "@/components/ai-insights"
import { DashboardHeader } from "@/components/dashboard-header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export const metadata = {
  title: "AI Insights | Agency Timesheet",
  description: "AI-powered insights for your timesheet data",
}

export default function AiInsightsPage() {
  return (
    <div className="flex flex-col gap-6">
      <DashboardHeader
        heading="AI Insights"
        text="AI-powered analysis of your timesheet data to help you work more efficiently."
      />

      <Tabs defaultValue="insights" className="space-y-4">
        <TabsList>
          <TabsTrigger value="insights">Insights</TabsTrigger>
          <TabsTrigger value="trends">Trends</TabsTrigger>
          <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
        </TabsList>

        <TabsContent value="insights" className="space-y-4">
          <AiInsights />
        </TabsContent>

        <TabsContent value="trends">
          <Card>
            <CardHeader>
              <CardTitle>Trends</CardTitle>
              <CardDescription>Visualize your productivity and billing trends over time.</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Trend analysis will be available in a future update. Check back soon!
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="recommendations">
          <Card>
            <CardHeader>
              <CardTitle>Recommendations</CardTitle>
              <CardDescription>Personalized recommendations to improve your productivity.</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Detailed recommendations will be available in a future update. Check back soon!
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
