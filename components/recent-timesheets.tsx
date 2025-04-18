import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

export function RecentTimesheets() {
  // This would typically come from your database
  const timesheets = [
    {
      id: "1",
      user: {
        name: "Alex Johnson",
        avatar: "/placeholder.svg?height=32&width=32",
        initials: "AJ",
      },
      project: "Website Redesign - Acme Corp",
      task: "Design",
      hours: 3.5,
      date: "Today, 2:30 PM",
      billable: true,
    },
    {
      id: "2",
      user: {
        name: "Sarah Miller",
        avatar: "/placeholder.svg?height=32&width=32",
        initials: "SM",
      },
      project: "Social Media Campaign - TechStart",
      task: "Copywriting",
      hours: 2,
      date: "Today, 11:45 AM",
      billable: true,
    },
    {
      id: "3",
      user: {
        name: "Michael Chen",
        avatar: "/placeholder.svg?height=32&width=32",
        initials: "MC",
      },
      project: "Brand Identity - FreshFoods",
      task: "Client Meeting",
      hours: 1.5,
      date: "Today, 10:15 AM",
      billable: true,
    },
    {
      id: "4",
      user: {
        name: "Emily Wilson",
        avatar: "/placeholder.svg?height=32&width=32",
        initials: "EW",
      },
      project: "Video Production - SportsFit",
      task: "Project Management",
      hours: 2.25,
      date: "Yesterday, 4:30 PM",
      billable: true,
    },
    {
      id: "5",
      user: {
        name: "David Park",
        avatar: "/placeholder.svg?height=32&width=32",
        initials: "DP",
      },
      project: "Website Redesign - Acme Corp",
      task: "Development",
      hours: 4,
      date: "Yesterday, 2:00 PM",
      billable: true,
    },
  ]

  return (
    <div className="space-y-4">
      {timesheets.map((timesheet) => (
        <div key={timesheet.id} className="flex items-center justify-between space-x-4">
          <div className="flex items-center space-x-4">
            <Avatar className="h-8 w-8">
              <AvatarImage src={timesheet.user.avatar || "/placeholder.svg"} alt={timesheet.user.name} />
              <AvatarFallback>{timesheet.user.initials}</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-medium leading-none">{timesheet.user.name}</p>
              <p className="text-sm text-muted-foreground">{timesheet.project}</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex flex-col items-end">
              <div className="flex items-center space-x-1">
                <p className="text-sm font-medium">{timesheet.hours} hrs</p>
                {timesheet.billable && (
                  <Badge variant="outline" className="text-xs">
                    Billable
                  </Badge>
                )}
              </div>
              <p className="text-xs text-muted-foreground">{timesheet.date}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
