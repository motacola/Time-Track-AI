"use client"

import {
  CalendarDays,
  Clock,
  LayoutDashboard,
  Mic,
  PieChart,
  Users,
  Zap,
  Edit2,
  Briefcase,
  AlertCircle,
} from "lucide-react"
import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { RecentTimesheets } from "@/components/recent-timesheets"
import { TeamActivity } from "@/components/team-activity"
import { UpcomingDeadlines } from "@/components/upcoming-deadlines"
import { AiInsights } from "@/components/ai-insights"

// Define proper types for the props
interface DashboardContentProps {
  timesheetEntries?: any[]
  projects?: any[]
  error?: string
}

export function DashboardContent({ timesheetEntries = [], projects = [], error }: DashboardContentProps) {
  const router = useRouter()
  const [isClient, setIsClient] = useState(false)

  // This ensures hydration issues don't occur
  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient) {
    return null // Return nothing during SSR to prevent hydration mismatch
  }

  return (
    <DashboardShell>
      <DashboardHeader heading="Dashboard" text="Overview of your agency's activity">
        <div className="flex gap-2">
          <Button
            variant="outline"
            className="bg-blue-50 border-blue-200 hover:bg-blue-100 hover:border-blue-300"
            onClick={() => router.push("/timesheet/new?tab=voice")}
          >
            <Mic className="mr-2 h-4 w-4 text-blue-600" />
            Voice Entry
          </Button>
          <Button onClick={() => router.push("/timesheet/new?tab=text")}>
            <Edit2 className="mr-2 h-4 w-4" />
            Manual Entry
          </Button>
        </div>
      </DashboardHeader>

      {error && (
        <Alert variant="destructive" className="mb-6">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <div className="mb-8">
        <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          <Card className="bg-blue-50 border-blue-200">
            <CardContent className="p-4">
              <Button
                variant="ghost"
                className="w-full justify-start p-0 h-auto hover:bg-transparent"
                onClick={() => router.push("/timesheet/new?tab=voice")}
              >
                <div className="flex items-center">
                  <div className="bg-blue-100 p-2 rounded-full mr-3">
                    <Mic className="h-5 w-5 text-blue-600" />
                  </div>
                  <div className="text-left">
                    <h3 className="font-medium text-blue-900">Voice Entry</h3>
                    <p className="text-xs text-blue-700">Log time using voice</p>
                  </div>
                </div>
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <Button
                variant="ghost"
                className="w-full justify-start p-0 h-auto hover:bg-transparent"
                onClick={() => router.push("/timesheet/new?tab=text")}
              >
                <div className="flex items-center">
                  <div className="bg-gray-100 p-2 rounded-full mr-3">
                    <Edit2 className="h-5 w-5 text-gray-600" />
                  </div>
                  <div className="text-left">
                    <h3 className="font-medium">Manual Entry</h3>
                    <p className="text-xs text-muted-foreground">Create timesheet entry</p>
                  </div>
                </div>
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <Button
                variant="ghost"
                className="w-full justify-start p-0 h-auto hover:bg-transparent"
                onClick={() => router.push("/timesheet")}
              >
                <div className="flex items-center">
                  <div className="bg-gray-100 p-2 rounded-full mr-3">
                    <Clock className="h-5 w-5 text-gray-600" />
                  </div>
                  <div className="text-left">
                    <h3 className="font-medium">View Timesheets</h3>
                    <p className="text-xs text-muted-foreground">See all timesheet entries</p>
                  </div>
                </div>
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <Button
                variant="ghost"
                className="w-full justify-start p-0 h-auto hover:bg-transparent"
                onClick={() => router.push("/projects")}
              >
                <div className="flex items-center">
                  <div className="bg-gray-100 p-2 rounded-full mr-3">
                    <Briefcase className="h-5 w-5 text-gray-600" />
                  </div>
                  <div className="text-left">
                    <h3 className="font-medium">Projects</h3>
                    <p className="text-xs text-muted-foreground">Manage active projects</p>
                  </div>
                </div>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
          <TabsTrigger value="insights" className="flex items-center gap-1">
            <Zap className="h-3.5 w-3.5" />
            AI Insights
          </TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Hours This Month</CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">1,248</div>
                <p className="text-xs text-muted-foreground">+12.5% from last month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Projects</CardTitle>
                <LayoutDashboard className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{projects.filter((p) => p.status === "Active").length || 24}</div>
                <p className="text-xs text-muted-foreground">4 due this week</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Team Utilization</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">78%</div>
                <p className="text-xs text-muted-foreground">+4% from last month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Billable Ratio</CardTitle>
                <PieChart className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">82%</div>
                <p className="text-xs text-muted-foreground">+2.5% from last month</p>
              </CardContent>
            </Card>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Recent Timesheets</CardTitle>
                <CardDescription>Your team's most recent time entries</CardDescription>
              </CardHeader>
              <CardContent>
                <RecentTimesheets entries={timesheetEntries} />
              </CardContent>
            </Card>
            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>Upcoming Deadlines</CardTitle>
                <CardDescription>Projects due in the next 14 days</CardDescription>
              </CardHeader>
              <CardContent>
                <UpcomingDeadlines projects={projects} />
              </CardContent>
            </Card>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Team Activity</CardTitle>
                <CardDescription>Hours logged by team members this week</CardDescription>
              </CardHeader>
              <CardContent>
                <TeamActivity />
              </CardContent>
            </Card>
            <Card className="col-span-3">
              <CardHeader className="flex flex-row items-center justify-between space-y-0">
                <div>
                  <CardTitle>Calendar</CardTitle>
                  <CardDescription>Upcoming meetings and deadlines</CardDescription>
                </div>
                <CalendarDays className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="grid gap-2">
                  {/* Calendar would go here */}
                  <div className="rounded-md bg-muted p-8 text-center">Calendar component would render here</div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="analytics" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Analytics</CardTitle>
              <CardDescription>Detailed analytics about your agency's performance</CardDescription>
            </CardHeader>
            <CardContent className="h-[450px] flex items-center justify-center">
              <div className="text-center">
                <p className="text-muted-foreground">Analytics charts would render here</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="reports" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Reports</CardTitle>
              <CardDescription>Generate and view custom reports</CardDescription>
            </CardHeader>
            <CardContent className="h-[450px] flex items-center justify-center">
              <div className="text-center">
                <p className="text-muted-foreground">Reports interface would render here</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="insights" className="space-y-4">
          <AiInsights />
        </TabsContent>
      </Tabs>
    </DashboardShell>
  )
}
