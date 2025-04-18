import { CalendarClock } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

export function UpcomingDeadlines() {
  // This would typically come from your database
  const deadlines = [
    {
      id: "1",
      project: "Website Redesign - Acme Corp",
      dueDate: "Oct 15, 2024",
      daysLeft: 5,
      progress: 75,
      status: "On Track",
    },
    {
      id: "2",
      project: "Social Media Campaign - TechStart",
      dueDate: "Oct 18, 2024",
      daysLeft: 8,
      progress: 60,
      status: "On Track",
    },
    {
      id: "3",
      project: "Brand Identity - FreshFoods",
      dueDate: "Oct 22, 2024",
      daysLeft: 12,
      progress: 40,
      status: "At Risk",
    },
    {
      id: "4",
      project: "Video Production - SportsFit",
      dueDate: "Oct 25, 2024",
      daysLeft: 15,
      progress: 25,
      status: "On Track",
    },
  ]

  return (
    <div className="space-y-4">
      {deadlines.map((deadline) => (
        <div key={deadline.id} className="space-y-2">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium">{deadline.project}</p>
              <div className="flex items-center text-xs text-muted-foreground">
                <CalendarClock className="mr-1 h-3 w-3" />
                <span>
                  {deadline.dueDate} ({deadline.daysLeft} days left)
                </span>
              </div>
            </div>
            <Badge variant={deadline.status === "At Risk" ? "destructive" : "outline"} className="text-xs">
              {deadline.status}
            </Badge>
          </div>
          <Progress value={deadline.progress} className="h-2" />
        </div>
      ))}
    </div>
  )
}
