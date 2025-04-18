"use client"

import { useState } from "react"
import {
  Calendar,
  Clock,
  DollarSign,
  Users,
  ArrowRight,
  Lightbulb,
  TrendingUp,
  AlertTriangle,
  CheckCircle2,
  HelpCircle,
  Brain,
  Briefcase,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

type PredictionType = "timeline" | "resources" | "revenue" | "trends"

interface AiPredictionsProps {
  type: PredictionType
}

export function AiPredictions({ type }: AiPredictionsProps) {
  const [expandedInsight, setExpandedInsight] = useState<string | null>(null)

  const toggleInsight = (id: string) => {
    if (expandedInsight === id) {
      setExpandedInsight(null)
    } else {
      setExpandedInsight(id)
    }
  }

  const renderTimelinePredictions = () => (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-medium">Website Redesign - Acme Corp</CardTitle>
              <Badge variant="outline" className="bg-amber-500/10 text-amber-500 border-amber-500/20">
                At Risk
              </Badge>
            </div>
            <CardDescription>Predicted completion: Oct 20, 2024 (5 days late)</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Current Progress</span>
                  <span className="font-medium">75%</span>
                </div>
                <Progress value={75} className="h-2" />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Expected Progress at This Point</span>
                  <span className="font-medium">85%</span>
                </div>
                <Progress value={85} className="h-2 bg-muted/50" />
              </div>

              {expandedInsight === "acme" && (
                <div className="space-y-4 mt-4">
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div className="bg-muted/50 p-3 rounded-lg">
                      <div className="text-muted-foreground mb-1">Original Deadline</div>
                      <div className="font-medium">Oct 15, 2024</div>
                    </div>
                    <div className="bg-muted/50 p-3 rounded-lg">
                      <div className="text-muted-foreground mb-1">Predicted Completion</div>
                      <div className="font-medium">Oct 20, 2024</div>
                    </div>
                    <div className="bg-muted/50 p-3 rounded-lg">
                      <div className="text-muted-foreground mb-1">Current Velocity</div>
                      <div className="font-medium">4.2% / day</div>
                    </div>
                    <div className="bg-muted/50 p-3 rounded-lg">
                      <div className="text-muted-foreground mb-1">Required Velocity</div>
                      <div className="font-medium">6.3% / day</div>
                    </div>
                  </div>

                  <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 text-sm">
                    <div className="flex items-start gap-2">
                      <AlertTriangle className="h-4 w-4 text-amber-500 mt-0.5 flex-shrink-0" />
                      <div>
                        <span className="font-medium text-amber-700">Risk Factors:</span>
                        <ul className="mt-1 space-y-1 text-amber-700">
                          <li>Design revisions taking longer than estimated</li>
                          <li>Developer availability reduced due to parallel projects</li>
                          <li>Client feedback delays in approval process</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="bg-primary/5 border border-primary/20 rounded-lg p-3 text-sm">
                    <div className="flex items-start gap-2">
                      <Lightbulb className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                      <div>
                        <span className="font-medium">AI Recommendation:</span> Allocate 2 additional developers for the
                        next 5 days to increase velocity, or discuss a timeline extension with the client.
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="ghost" size="sm" onClick={() => toggleInsight("acme")} className="w-full justify-between">
              {expandedInsight === "acme" ? "Show Less" : "View Details"}
              <ArrowRight className={`h-4 w-4 transition-transform ${expandedInsight === "acme" ? "rotate-90" : ""}`} />
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-medium">Social Media Campaign - TechStart</CardTitle>
              <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500/20">
                On Track
              </Badge>
            </div>
            <CardDescription>Predicted completion: Oct 17, 2024 (1 day early)</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Current Progress</span>
                  <span className="font-medium">60%</span>
                </div>
                <Progress value={60} className="h-2" />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Expected Progress at This Point</span>
                  <span className="font-medium">55%</span>
                </div>
                <Progress value={55} className="h-2 bg-muted/50" />
              </div>

              {expandedInsight === "techstart" && (
                <div className="space-y-4 mt-4">
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div className="bg-muted/50 p-3 rounded-lg">
                      <div className="text-muted-foreground mb-1">Original Deadline</div>
                      <div className="font-medium">Oct 18, 2024</div>
                    </div>
                    <div className="bg-muted/50 p-3 rounded-lg">
                      <div className="text-muted-foreground mb-1">Predicted Completion</div>
                      <div className="font-medium">Oct 17, 2024</div>
                    </div>
                    <div className="bg-muted/50 p-3 rounded-lg">
                      <div className="text-muted-foreground mb-1">Current Velocity</div>
                      <div className="font-medium">5.8% / day</div>
                    </div>
                    <div className="bg-muted/50 p-3 rounded-lg">
                      <div className="text-muted-foreground mb-1">Required Velocity</div>
                      <div className="font-medium">5.0% / day</div>
                    </div>
                  </div>

                  <div className="bg-green-50 border border-green-200 rounded-lg p-3 text-sm">
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <div>
                        <span className="font-medium text-green-700">Success Factors:</span>
                        <ul className="mt-1 space-y-1 text-green-700">
                          <li>Copywriting completed ahead of schedule</li>
                          <li>Client provided assets promptly</li>
                          <li>Team has prior experience with similar campaigns</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="bg-primary/5 border border-primary/20 rounded-lg p-3 text-sm">
                    <div className="flex items-start gap-2">
                      <Lightbulb className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                      <div>
                        <span className="font-medium">AI Recommendation:</span> Consider reallocating some resources to
                        the Website Redesign project while maintaining current velocity.
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
          <CardFooter>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => toggleInsight("techstart")}
              className="w-full justify-between"
            >
              {expandedInsight === "techstart" ? "Show Less" : "View Details"}
              <ArrowRight
                className={`h-4 w-4 transition-transform ${expandedInsight === "techstart" ? "rotate-90" : ""}`}
              />
            </Button>
          </CardFooter>
        </Card>
      </div>

      <Card className="bg-primary/5 border-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-primary" />
            How AI Predicts Project Timelines
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-3">
            <div className="flex flex-col items-center text-center space-y-2 p-4">
              <div className="rounded-full bg-primary/10 p-3">
                <Clock className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-medium">Historical Data Analysis</h3>
              <p className="text-sm text-muted-foreground">
                Our AI analyzes past projects to identify patterns in completion times and potential bottlenecks.
              </p>
            </div>
            <div className="flex flex-col items-center text-center space-y-2 p-4">
              <div className="rounded-full bg-primary/10 p-3">
                <TrendingUp className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-medium">Velocity Tracking</h3>
              <p className="text-sm text-muted-foreground">
                By measuring your team's current work rate, AI can project accurate completion dates.
              </p>
            </div>
            <div className="flex flex-col items-center text-center space-y-2 p-4">
              <div className="rounded-full bg-primary/10 p-3">
                <AlertTriangle className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-medium">Risk Assessment</h3>
              <p className="text-sm text-muted-foreground">
                AI identifies potential risks that could impact timelines and suggests mitigation strategies.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const renderResourcePredictions = () => (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-medium">Team Capacity Forecast</CardTitle>
              <Badge variant="outline" className="bg-red-500/10 text-red-500 border-red-500/20">
                Over Capacity
              </Badge>
            </div>
            <CardDescription>November 2024 resource allocation prediction</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Design Team Capacity</span>
                  <span className="font-medium">85%</span>
                </div>
                <Progress value={85} className="h-2" />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Development Team Capacity</span>
                  <span className="font-medium text-red-500">132%</span>
                </div>
                <Progress value={100} className="h-2 bg-red-200" />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Marketing Team Capacity</span>
                  <span className="font-medium">70%</span>
                </div>
                <Progress value={70} className="h-2" />
              </div>

              {expandedInsight === "capacity" && (
                <div className="space-y-4 mt-4">
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div className="bg-muted/50 p-3 rounded-lg">
                      <div className="text-muted-foreground mb-1">Development Capacity</div>
                      <div className="font-medium">160 hrs/week</div>
                    </div>
                    <div className="bg-muted/50 p-3 rounded-lg">
                      <div className="text-muted-foreground mb-1">Projected Demand</div>
                      <div className="font-medium text-red-500">212 hrs/week</div>
                    </div>
                  </div>

                  <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-sm">
                    <div className="flex items-start gap-2">
                      <AlertTriangle className="h-4 w-4 text-red-500 mt-0.5 flex-shrink-0" />
                      <div>
                        <span className="font-medium text-red-700">Resource Conflicts:</span>
                        <ul className="mt-1 space-y-1 text-red-700">
                          <li>3 major projects with overlapping development phases</li>
                          <li>2 developers scheduled for vacation in November</li>
                          <li>New project onboarding requiring significant resources</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="bg-primary/5 border border-primary/20 rounded-lg p-3 text-sm">
                    <div className="flex items-start gap-2">
                      <Lightbulb className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                      <div>
                        <span className="font-medium">AI Recommendations:</span>
                        <ul className="mt-1 space-y-1">
                          <li>Hire 2 contract developers for November-December</li>
                          <li>Reschedule 30% of development work to December-January</li>
                          <li>Prioritize critical path tasks and delay non-essential features</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
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
              <Badge variant="outline" className="bg-amber-500/10 text-amber-500 border-amber-500/20">
                Action Needed
              </Badge>
            </div>
            <CardDescription>Identified skill shortages based on upcoming projects</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Motion Graphics</span>
                  <span className="font-medium text-amber-500">Skill Gap</span>
                </div>
                <div className="flex items-center gap-2">
                  <Progress value={40} className="h-2 flex-1" />
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <HelpCircle className="h-4 w-4 text-muted-foreground" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="text-xs">Tasks taking 40% longer than estimated</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>3D Modeling</span>
                  <span className="font-medium text-amber-500">Skill Gap</span>
                </div>
                <div className="flex items-center gap-2">
                  <Progress value={35} className="h-2 flex-1" />
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <HelpCircle className="h-4 w-4 text-muted-foreground" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="text-xs">Limited in-house expertise for upcoming 3D projects</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              </div>

              {expandedInsight === "skill-gap" && (
                <div className="space-y-4 mt-4">
                  <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 text-sm">
                    <div className="flex items-start gap-2">
                      <AlertTriangle className="h-4 w-4 text-amber-500 mt-0.5 flex-shrink-0" />
                      <div>
                        <span className="font-medium text-amber-700">Impact Analysis:</span>
                        <ul className="mt-1 space-y-1 text-amber-700">
                          <li>Motion graphics tasks taking 40% longer than estimated</li>
                          <li>3D modeling requirements increasing with upcoming projects</li>
                          <li>Current team lacks specialized expertise in these areas</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="bg-primary/5 border border-primary/20 rounded-lg p-3 text-sm">
                    <div className="flex items-start gap-2">
                      <Lightbulb className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                      <div>
                        <span className="font-medium">AI Recommendations:</span>
                        <ul className="mt-1 space-y-1">
                          <li>Invest in motion graphics training for your design team</li>
                          <li>Hire a specialized 3D modeling contractor for upcoming projects</li>
                          <li>Consider partnering with a specialized studio for complex 3D work</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
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

      <Card className="bg-primary/5 border-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5 text-primary" />
            How AI Optimizes Resource Allocation
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-3">
            <div className="flex flex-col items-center text-center space-y-2 p-4">
              <div className="rounded-full bg-primary/10 p-3">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-medium">Capacity Planning</h3>
              <p className="text-sm text-muted-foreground">
                AI analyzes your team's availability and workload to identify potential bottlenecks before they occur.
              </p>
            </div>
            <div className="flex flex-col items-center text-center space-y-2 p-4">
              <div className="rounded-full bg-primary/10 p-3">
                <Brain className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-medium">Skill Matching</h3>
              <p className="text-sm text-muted-foreground">
                Our AI identifies the optimal team members for each task based on skills and experience.
              </p>
            </div>
            <div className="flex flex-col items-center text-center space-y-2 p-4">
              <div className="rounded-full bg-primary/10 p-3">
                <Lightbulb className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-medium">Proactive Solutions</h3>
              <p className="text-sm text-muted-foreground">
                Get actionable recommendations to address resource constraints before they impact your projects.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const renderRevenuePredictions = () => (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-medium">Q4 Revenue Forecast</CardTitle>
              <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500/20">
                Growth Predicted
              </Badge>
            </div>
            <CardDescription>Projected revenue based on current projects and pipeline</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Q3 Revenue (Baseline)</span>
                  <span className="font-medium">100%</span>
                </div>
                <Progress value={100} className="h-2" />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Q4 Projected Revenue</span>
                  <span className="font-medium text-green-500">118%</span>
                </div>
                <Progress value={118} className="h-2" />
              </div>

              {expandedInsight === "revenue" && (
                <div className="space-y-4 mt-4">
                  <div className="grid grid-cols-3 gap-2">
                    <div>
                      <span className="text-xs text-muted-foreground">October</span>
                      <Progress value={105} className="h-2 mt-1" />
                      <span className="text-xs font-medium">+5%</span>
                    </div>
                    <div>
                      <span className="text-xs text-muted-foreground">November</span>
                      <Progress value={115} className="h-2 mt-1" />
                      <span className="text-xs font-medium">+15%</span>
                    </div>
                    <div>
                      <span className="text-xs text-muted-foreground">December</span>
                      <Progress value={135} className="h-2 mt-1" />
                      <span className="text-xs font-medium">+35%</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div className="bg-muted/50 p-3 rounded-lg">
                      <div className="text-muted-foreground mb-1">Q3 Revenue</div>
                      <div className="font-medium">$320,000</div>
                    </div>
                    <div className="bg-muted/50 p-3 rounded-lg">
                      <div className="text-muted-foreground mb-1">Q4 Projected</div>
                      <div className="font-medium text-green-500">$377,600</div>
                    </div>
                  </div>

                  <div className="bg-green-50 border border-green-200 rounded-lg p-3 text-sm">
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <div>
                        <span className="font-medium text-green-700">Growth Drivers:</span>
                        <ul className="mt-1 space-y-1 text-green-700">
                          <li>3 new client contracts signed in Q3</li>
                          <li>Seasonal increase in marketing projects in December</li>
                          <li>Expanded services offering with higher margins</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="bg-primary/5 border border-primary/20 rounded-lg p-3 text-sm">
                    <div className="flex items-start gap-2">
                      <Lightbulb className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                      <div>
                        <span className="font-medium">AI Recommendations:</span>
                        <ul className="mt-1 space-y-1">
                          <li>Plan for increased capacity in December to handle the projected workload</li>
                          <li>Consider year-end bonuses based on the strong Q4 performance</li>
                          <li>Reinvest 15% of the growth into expanding high-margin service offerings</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
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

        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-medium">Client Revenue Potential</CardTitle>
              <Badge variant="outline" className="bg-primary/10">
                Opportunities
              </Badge>
            </div>
            <CardDescription>AI-identified revenue growth opportunities by client</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Acme Corp</span>
                  <span className="font-medium">Current: $120K / Potential: $150K</span>
                </div>
                <div className="flex items-center gap-1">
                  <Progress value={80} className="h-2 flex-1" />
                  <span className="text-xs text-green-500">+25%</span>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>TechStart</span>
                  <span className="font-medium">Current: $85K / Potential: $110K</span>
                </div>
                <div className="flex items-center gap-1">
                  <Progress value={77} className="h-2 flex-1" />
                  <span className="text-xs text-green-500">+29%</span>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>FreshFoods</span>
                  <span className="font-medium">Current: $65K / Potential: $75K</span>
                </div>
                <div className="flex items-center gap-1">
                  <Progress value={87} className="h-2 flex-1" />
                  <span className="text-xs text-green-500">+15%</span>
                </div>
              </div>

              {expandedInsight === "client-revenue" && (
                <div className="space-y-4 mt-4">
                  <div className="bg-primary/5 border border-primary/20 rounded-lg p-3 text-sm">
                    <div className="flex items-start gap-2">
                      <Lightbulb className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                      <div>
                        <span className="font-medium">Growth Opportunities:</span>
                        <ul className="mt-1 space-y-1">
                          <li>
                            <span className="font-medium">Acme Corp:</span> Expand into video production services
                            (+$30K)
                          </li>
                          <li>
                            <span className="font-medium">TechStart:</span> Propose annual retainer for ongoing support
                            (+$25K)
                          </li>
                          <li>
                            <span className="font-medium">FreshFoods:</span> Add social media management to current
                            services (+$10K)
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="bg-muted/50 p-3 rounded-lg text-sm">
                    <div className="flex items-start gap-2">
                      <TrendingUp className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                      <div>
                        <span className="font-medium">AI Analysis:</span> Based on client spending patterns, service
                        utilization, and industry benchmarks, these clients are likely to increase their budgets if
                        presented with targeted service expansions.
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
          <CardFooter>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => toggleInsight("client-revenue")}
              className="w-full justify-between"
            >
              {expandedInsight === "client-revenue" ? "Show Less" : "View Details"}
              <ArrowRight
                className={`h-4 w-4 transition-transform ${expandedInsight === "client-revenue" ? "rotate-90" : ""}`}
              />
            </Button>
          </CardFooter>
        </Card>
      </div>

      <Card className="bg-primary/5 border-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <DollarSign className="h-5 w-5 text-primary" />
            How AI Forecasts Revenue
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-3">
            <div className="flex flex-col items-center text-center space-y-2 p-4">
              <div className="rounded-full bg-primary/10 p-3">
                <TrendingUp className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-medium">Trend Analysis</h3>
              <p className="text-sm text-muted-foreground">
                AI identifies patterns in your historical revenue data to predict future performance.
              </p>
            </div>
            <div className="flex flex-col items-center text-center space-y-2 p-4">
              <div className="rounded-full bg-primary/10 p-3">
                <Briefcase className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-medium">Pipeline Assessment</h3>
              <p className="text-sm text-muted-foreground">
                Our AI evaluates your current project pipeline and client relationships to forecast revenue.
              </p>
            </div>
            <div className="flex flex-col items-center text-center space-y-2 p-4">
              <div className="rounded-full bg-primary/10 p-3">
                <DollarSign className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-medium">Growth Opportunities</h3>
              <p className="text-sm text-muted-foreground">
                AI identifies untapped revenue potential with existing clients and suggests expansion strategies.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const renderTrendsPredictions = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Industry Trends Analysis</CardTitle>
          <CardDescription>AI-powered analysis of industry trends relevant to your agency</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="space-y-3">
              <h3 className="text-lg font-medium">Emerging Service Demands</h3>
              <div className="grid gap-4 md:grid-cols-3">
                <div className="bg-muted/50 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium">AI Content Creation</h4>
                    <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500/20">
                      High Growth
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">
                    Demand for AI-assisted content creation services is growing rapidly as businesses seek to scale
                    content production.
                  </p>
                  <div className="text-sm bg-primary/5 p-2 rounded border border-primary/20">
                    <span className="font-medium">Opportunity:</span> Develop AI content creation services to complement
                    your existing creative offerings.
                  </div>
                </div>

                <div className="bg-muted/50 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium">Interactive Experiences</h4>
                    <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500/20">
                      Growing
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">
                    Clients are increasingly requesting interactive web experiences and immersive content over static
                    designs.
                  </p>
                  <div className="text-sm bg-primary/5 p-2 rounded border border-primary/20">
                    <span className="font-medium">Opportunity:</span> Expand capabilities in interactive design and
                    development to meet this demand.
                  </div>
                </div>

                <div className="bg-muted/50 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium">Data Visualization</h4>
                    <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500/20">
                      Steady Growth
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">
                    Companies are seeking better ways to visualize and communicate complex data to their audiences.
                  </p>
                  <div className="text-sm bg-primary/5 p-2 rounded border border-primary/20">
                    <span className="font-medium">Opportunity:</span> Develop specialized data visualization services
                    for marketing and reporting.
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="text-lg font-medium">Pricing & Business Model Trends</h3>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="bg-muted/50 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium">Value-Based Pricing</h4>
                    <Badge variant="outline" className="bg-primary/10">
                      Industry Shift
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">
                    Agencies are moving away from hourly billing toward value-based pricing models that better align
                    with client outcomes.
                  </p>
                  <div className="text-sm bg-primary/5 p-2 rounded border border-primary/20">
                    <span className="font-medium">AI Recommendation:</span> Consider transitioning 25% of your projects
                    to value-based pricing in the next quarter.
                  </div>
                </div>

                <div className="bg-muted/50 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium">Subscription Services</h4>
                    <Badge variant="outline" className="bg-primary/10">
                      Growing Adoption
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">
                    Recurring revenue models through service subscriptions are becoming more common in the agency space.
                  </p>
                  <div className="text-sm bg-primary/5 p-2 rounded border border-primary/20">
                    <span className="font-medium">AI Recommendation:</span> Develop a tiered subscription model for
                    ongoing services like content creation and social media management.
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="text-lg font-medium">Technology Adoption</h3>
              <div className="grid gap-4 md:grid-cols-3">
                <div className="bg-muted/50 rounded-lg p-4">
                  <h4 className="font-medium mb-2">AI & Automation</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Industry Adoption</span>
                      <span className="font-medium">68%</span>
                    </div>
                    <Progress value={68} className="h-2" />
                    <p className="text-xs text-muted-foreground">
                      Agencies using AI tools for content creation, data analysis, and workflow automation
                    </p>
                  </div>
                </div>

                <div className="bg-muted/50 rounded-lg p-4">
                  <h4 className="font-medium mb-2">No-Code Tools</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Industry Adoption</span>
                      <span className="font-medium">72%</span>
                    </div>
                    <Progress value={72} className="h-2" />
                    <p className="text-xs text-muted-foreground">
                      Agencies using no-code tools to accelerate development and reduce technical overhead
                    </p>
                  </div>
                </div>

                <div className="bg-muted/50 rounded-lg p-4">
                  <h4 className="font-medium mb-2">Virtual Collaboration</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Industry Adoption</span>
                      <span className="font-medium">85%</span>
                    </div>
                    <Progress value={85} className="h-2" />
                    <p className="text-xs text-muted-foreground">
                      Agencies using advanced virtual collaboration tools for remote and hybrid teams
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-primary/5 border-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-primary" />
            How AI Identifies Industry Trends
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-3">
            <div className="flex flex-col items-center text-center space-y-2 p-4">
              <div className="rounded-full bg-primary/10 p-3">
                <Brain className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-medium">Market Intelligence</h3>
              <p className="text-sm text-muted-foreground">
                Our AI analyzes industry publications, research reports, and market data to identify emerging trends.
              </p>
            </div>
            <div className="flex flex-col items-center text-center space-y-2 p-4">
              <div className="rounded-full bg-primary/10 p-3">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-medium">Competitive Analysis</h3>
              <p className="text-sm text-muted-foreground">
                AI monitors competitor activities and service offerings to help you stay ahead of industry shifts.
              </p>
            </div>
            <div className="flex flex-col items-center text-center space-y-2 p-4">
              <div className="rounded-full bg-primary/10 p-3">
                <Lightbulb className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-medium">Opportunity Identification</h3>
              <p className="text-sm text-muted-foreground">
                Based on your agency's strengths and market trends, AI identifies specific growth opportunities.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const renderContent = () => {
    switch (type) {
      case "timeline":
        return renderTimelinePredictions()
      case "resources":
        return renderResourcePredictions()
      case "revenue":
        return renderRevenuePredictions()
      case "trends":
        return renderTrendsPredictions()
      default:
        return renderTimelinePredictions()
    }
  }

  return renderContent()
}
