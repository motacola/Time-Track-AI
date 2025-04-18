"use client"

import { useState } from "react"
import { ArrowRight, Brain, Clock, DollarSign, LineChart, Lightbulb } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

export function AiInsights() {
  const [expandedInsight, setExpandedInsight] = useState<string | null>(null)

  const toggleInsight = (id: string) => {
    if (expandedInsight === id) {
      setExpandedInsight(null)
    } else {
      setExpandedInsight(id)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2">
        <Brain className="h-5 w-5 text-primary" />
        <h2 className="text-2xl font-bold tracking-tight">AI-Powered Insights</h2>
      </div>

      <p className="text-muted-foreground">
        Our AI analyzes your timesheet data to provide actionable insights that can help improve productivity and
        profitability.
      </p>

      <Tabs defaultValue="productivity">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="productivity">Productivity</TabsTrigger>
          <TabsTrigger value="resource">Resource Allocation</TabsTrigger>
          <TabsTrigger value="profitability">Profitability</TabsTrigger>
          <TabsTrigger value="predictions">Predictions</TabsTrigger>
        </TabsList>

        <TabsContent value="productivity" className="space-y-4 pt-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg font-medium">Time Usage Optimization</CardTitle>
                  <Badge variant="outline" className="bg-primary/10">
                    High Impact
                  </Badge>
                </div>
                <CardDescription>AI-detected patterns in your team's time usage</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Your design team spends 35% of their time in meetings, which is 15% higher than industry average.
                </p>
                {expandedInsight === "time-usage" && (
                  <div className="space-y-4 mt-4 text-sm">
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Design Team Meeting Time</span>
                        <span className="font-medium">35%</span>
                      </div>
                      <Progress value={35} className="h-2" />
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Industry Average</span>
                        <span className="font-medium">20%</span>
                      </div>
                      <Progress value={20} className="h-2" />
                    </div>
                    <p className="text-sm mt-4">
                      <Lightbulb className="h-4 w-4 inline-block mr-1 text-amber-500" />
                      <span className="font-medium">AI Recommendation:</span> Consider implementing a "no-meeting
                      Wednesday" policy to provide more focused work time for your design team.
                    </p>
                  </div>
                )}
              </CardContent>
              <CardFooter>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => toggleInsight("time-usage")}
                  className="w-full justify-between"
                >
                  {expandedInsight === "time-usage" ? "Show Less" : "View Details"}
                  <ArrowRight
                    className={`h-4 w-4 transition-transform ${expandedInsight === "time-usage" ? "rotate-90" : ""}`}
                  />
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg font-medium">Task Switching Analysis</CardTitle>
                  <Badge variant="outline" className="bg-primary/10">
                    Medium Impact
                  </Badge>
                </div>
                <CardDescription>Impact of multitasking on productivity</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Team members who work on 3+ projects simultaneously are 24% less productive than those focused on 1-2
                  projects.
                </p>
                {expandedInsight === "task-switching" && (
                  <div className="space-y-4 mt-4 text-sm">
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>1-2 Projects (Productivity Baseline)</span>
                        <span className="font-medium">100%</span>
                      </div>
                      <Progress value={100} className="h-2" />
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>3+ Projects</span>
                        <span className="font-medium">76%</span>
                      </div>
                      <Progress value={76} className="h-2" />
                    </div>
                    <p className="text-sm mt-4">
                      <Lightbulb className="h-4 w-4 inline-block mr-1 text-amber-500" />
                      <span className="font-medium">AI Recommendation:</span> Limit concurrent projects to 2 per team
                      member when possible, and batch similar tasks together to reduce context switching.
                    </p>
                  </div>
                )}
              </CardContent>
              <CardFooter>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => toggleInsight("task-switching")}
                  className="w-full justify-between"
                >
                  {expandedInsight === "task-switching" ? "Show Less" : "View Details"}
                  <ArrowRight
                    className={`h-4 w-4 transition-transform ${expandedInsight === "task-switching" ? "rotate-90" : ""}`}
                  />
                </Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="resource" className="space-y-4 pt-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg font-medium">Team Capacity Planning</CardTitle>
                  <Badge variant="outline" className="bg-primary/10">
                    High Impact
                  </Badge>
                </div>
                <CardDescription>AI-predicted resource needs based on project pipeline</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Based on upcoming projects, your development team will be over capacity by 32% in November.
                </p>
                {expandedInsight === "capacity" && (
                  <div className="space-y-4 mt-4 text-sm">
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Current Development Capacity</span>
                        <span className="font-medium">160 hrs/week</span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Projected November Demand</span>
                        <span className="font-medium">212 hrs/week</span>
                      </div>
                      <Progress value={132} className="h-2" />
                    </div>
                    <p className="text-sm mt-4">
                      <Lightbulb className="h-4 w-4 inline-block mr-1 text-amber-500" />
                      <span className="font-medium">AI Recommendation:</span> Consider hiring a contract developer for
                      November-December or reschedule 30% of development work to December-January.
                    </p>
                  </div>
                )}
              </CardContent>
              <CardFooter>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => toggleInsight("capacity")}
                  className="w-full justify-between"
                >
                  {expandedInsight === "capacity" ? "Show Less" : "View Details"}
                  <ArrowRight
                    className={`h-4 w-4 transition-transform ${expandedInsight === "capacity" ? "rotate-90" : ""}`}
                  />
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg font-medium">Skill Gap Analysis</CardTitle>
                  <Badge variant="outline" className="bg-primary/10">
                    Medium Impact
                  </Badge>
                </div>
                <CardDescription>Identifying skill shortages based on project needs</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Motion graphics tasks are taking 40% longer than estimated, indicating a potential skill gap.
                </p>
                {expandedInsight === "skill-gap" && (
                  <div className="space-y-4 mt-4 text-sm">
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Motion Graphics (Estimated vs. Actual)</span>
                        <span className="font-medium">+40%</span>
                      </div>
                      <Progress value={140} className="h-2" />
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Other Design Tasks (Estimated vs. Actual)</span>
                        <span className="font-medium">+5%</span>
                      </div>
                      <Progress value={105} className="h-2" />
                    </div>
                    <p className="text-sm mt-4">
                      <Lightbulb className="h-4 w-4 inline-block mr-1 text-amber-500" />
                      <span className="font-medium">AI Recommendation:</span> Invest in motion graphics training for
                      your design team or consider hiring a specialist for these tasks.
                    </p>
                  </div>
                )}
              </CardContent>
              <CardFooter>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => toggleInsight("skill-gap")}
                  className="w-full justify-between"
                >
                  {expandedInsight === "skill-gap" ? "Show Less" : "View Details"}
                  <ArrowRight
                    className={`h-4 w-4 transition-transform ${expandedInsight === "skill-gap" ? "rotate-90" : ""}`}
                  />
                </Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="profitability" className="space-y-4 pt-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg font-medium">Project Profitability Analysis</CardTitle>
                  <Badge variant="outline" className="bg-primary/10">
                    High Impact
                  </Badge>
                </div>
                <CardDescription>AI-detected patterns in project profitability</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Website projects with fixed budgets are 22% less profitable than retainer-based projects.
                </p>
                {expandedInsight === "profitability" && (
                  <div className="space-y-4 mt-4 text-sm">
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Retainer Projects (Profit Margin)</span>
                        <span className="font-medium">42%</span>
                      </div>
                      <Progress value={42} className="h-2" />
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Fixed Budget Projects (Profit Margin)</span>
                        <span className="font-medium">20%</span>
                      </div>
                      <Progress value={20} className="h-2" />
                    </div>
                    <p className="text-sm mt-4">
                      <Lightbulb className="h-4 w-4 inline-block mr-1 text-amber-500" />
                      <span className="font-medium">AI Recommendation:</span> Consider adjusting your pricing model for
                      fixed budget projects or transition more clients to retainer-based relationships.
                    </p>
                  </div>
                )}
              </CardContent>
              <CardFooter>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => toggleInsight("profitability")}
                  className="w-full justify-between"
                >
                  {expandedInsight === "profitability" ? "Show Less" : "View Details"}
                  <ArrowRight
                    className={`h-4 w-4 transition-transform ${expandedInsight === "profitability" ? "rotate-90" : ""}`}
                  />
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg font-medium">Client Value Analysis</CardTitle>
                  <Badge variant="outline" className="bg-primary/10">
                    Medium Impact
                  </Badge>
                </div>
                <CardDescription>Identifying your most valuable client relationships</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Your top 3 clients by revenue require 15% less administrative time than other clients.
                </p>
                {expandedInsight === "client-value" && (
                  <div className="space-y-4 mt-4 text-sm">
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Top 3 Clients (Admin Time)</span>
                        <span className="font-medium">8%</span>
                      </div>
                      <Progress value={8} className="h-2" />
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Other Clients (Admin Time)</span>
                        <span className="font-medium">23%</span>
                      </div>
                      <Progress value={23} className="h-2" />
                    </div>
                    <p className="text-sm mt-4">
                      <Lightbulb className="h-4 w-4 inline-block mr-1 text-amber-500" />
                      <span className="font-medium">AI Recommendation:</span> Focus on acquiring more clients similar to
                      your top 3, and streamline processes for smaller clients to reduce administrative overhead.
                    </p>
                  </div>
                )}
              </CardContent>
              <CardFooter>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => toggleInsight("client-value")}
                  className="w-full justify-between"
                >
                  {expandedInsight === "client-value" ? "Show Less" : "View Details"}
                  <ArrowRight
                    className={`h-4 w-4 transition-transform ${expandedInsight === "client-value" ? "rotate-90" : ""}`}
                  />
                </Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="predictions" className="space-y-4 pt-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg font-medium">Project Timeline Predictions</CardTitle>
                  <Badge variant="outline" className="bg-primary/10">
                    High Impact
                  </Badge>
                </div>
                <CardDescription>AI-predicted completion dates based on historical data</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Based on current progress, the TechStart campaign is likely to be completed 5 days after the deadline.
                </p>
                {expandedInsight === "timeline" && (
                  <div className="space-y-4 mt-4 text-sm">
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Current Progress</span>
                        <span className="font-medium">60%</span>
                      </div>
                      <Progress value={60} className="h-2" />
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Expected Progress at This Point</span>
                        <span className="font-medium">75%</span>
                      </div>
                      <Progress value={75} className="h-2" />
                    </div>
                    <p className="text-sm mt-4">
                      <Lightbulb className="h-4 w-4 inline-block mr-1 text-amber-500" />
                      <span className="font-medium">AI Recommendation:</span> Allocate 2 additional team members to the
                      project for the next week to get back on schedule, or discuss timeline adjustment with the client.
                    </p>
                  </div>
                )}
              </CardContent>
              <CardFooter>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => toggleInsight("timeline")}
                  className="w-full justify-between"
                >
                  {expandedInsight === "timeline" ? "Show Less" : "View Details"}
                  <ArrowRight
                    className={`h-4 w-4 transition-transform ${expandedInsight === "timeline" ? "rotate-90" : ""}`}
                  />
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg font-medium">Revenue Forecasting</CardTitle>
                  <Badge variant="outline" className="bg-primary/10">
                    Medium Impact
                  </Badge>
                </div>
                <CardDescription>AI-predicted revenue based on current projects and pipeline</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Q4 revenue is projected to be 18% higher than Q3, with December showing the strongest growth.
                </p>
                {expandedInsight === "revenue" && (
                  <div className="space-y-4 mt-4 text-sm">
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Q3 Revenue (Baseline)</span>
                        <span className="font-medium">100%</span>
                      </div>
                      <Progress value={100} className="h-2" />
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Q4 Projected Revenue</span>
                        <span className="font-medium">118%</span>
                      </div>
                      <Progress value={118} className="h-2" />
                    </div>
                    <div className="grid grid-cols-3 gap-2 mt-2">
                      <div>
                        <span className="text-xs text-muted-foreground">October</span>
                        <Progress value={105} className="h-2 mt-1" />
                      </div>
                      <div>
                        <span className="text-xs text-muted-foreground">November</span>
                        <Progress value={115} className="h-2 mt-1" />
                      </div>
                      <div>
                        <span className="text-xs text-muted-foreground">December</span>
                        <Progress value={135} className="h-2 mt-1" />
                      </div>
                    </div>
                    <p className="text-sm mt-4">
                      <Lightbulb className="h-4 w-4 inline-block mr-1 text-amber-500" />
                      <span className="font-medium">AI Recommendation:</span> Plan for increased capacity in December to
                      handle the projected workload and consider year-end bonuses based on the strong Q4 performance.
                    </p>
                  </div>
                )}
              </CardContent>
              <CardFooter>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => toggleInsight("revenue")}
                  className="w-full justify-between"
                >
                  {expandedInsight === "revenue" ? "Show Less" : "View Details"}
                  <ArrowRight
                    className={`h-4 w-4 transition-transform ${expandedInsight === "revenue" ? "rotate-90" : ""}`}
                  />
                </Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      <Card className="bg-primary/5 border-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5 text-primary" />
            How AI Enhances Your Timesheet Data
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-3">
            <div className="flex flex-col items-center text-center space-y-2 p-4">
              <div className="rounded-full bg-primary/10 p-3">
                <LineChart className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-medium">Pattern Recognition</h3>
              <p className="text-sm text-muted-foreground">
                Our AI identifies patterns in your timesheet data that would be difficult to spot manually.
              </p>
            </div>
            <div className="flex flex-col items-center text-center space-y-2 p-4">
              <div className="rounded-full bg-primary/10 p-3">
                <Clock className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-medium">Predictive Analysis</h3>
              <p className="text-sm text-muted-foreground">
                Our AI predicts future trends based on historical data to help you plan more effectively.
              </p>
            </div>
            <div className="flex flex-col items-center text-center space-y-2 p-4">
              <div className="rounded-full bg-primary/10 p-3">
                <DollarSign className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-medium">Profitability Insights</h3>
              <p className="text-sm text-muted-foreground">
                Our AI identifies which projects, clients, and activities generate the most profit for your agency.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
