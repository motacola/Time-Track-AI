"use client"

import { useState } from "react"
import { Calendar } from "@/components/ui/calendar"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Clock, Users, Briefcase } from "lucide-react"

// Mock data for upcoming events
const upcomingEvents = [
  {
    id: 1,
    title: "Client Meeting - Acme Corp",
    date: new Date(2024, 11, 15), // December 15, 2024
    time: "10:00 AM",
    type: "meeting",
    color: "bg-blue-500",
  },
  {
    id: 2,
    title: "Project Deadline - Website Redesign",
    date: new Date(2024, 11, 18), // December 18, 2024
    time: "End of day",
    type: "deadline",
    color: "bg-red-500",
  },
  {
    id: 3,
    title: "Team Standup",
    date: new Date(2024, 11, 16), // December 16, 2024
    time: "9:00 AM",
    type: "meeting",
    color: "bg-green-500",
  },
  {
    id: 4,
    title: "Brand Guidelines Due",
    date: new Date(2024, 11, 20), // December 20, 2024
    time: "5:00 PM",
    type: "deadline",
    color: "bg-orange-500",
  },
]

export function DashboardCalendar() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())

  // Get events for the next 7 days
  const today = new Date()
  const nextWeek = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000)

  const upcomingEventsThisWeek = upcomingEvents
    .filter((event) => event.date >= today && event.date <= nextWeek)
    .sort((a, b) => a.date.getTime() - b.date.getTime())

  // Get dates that have events for calendar highlighting
  const eventDates = upcomingEvents.map((event) => event.date)

  const modifiers = {
    hasEvent: eventDates,
  }

  const modifiersStyles = {
    hasEvent: {
      backgroundColor: "rgb(59 130 246 / 0.1)",
      color: "rgb(59 130 246)",
      fontWeight: "bold",
    },
  }

  return (
    <div className="space-y-4">
      {/* Mini Calendar */}
      <div className="flex justify-center">
        <Calendar
          mode="single"
          selected={selectedDate}
          onSelect={setSelectedDate}
          modifiers={modifiers}
          modifiersStyles={modifiersStyles}
          className="rounded-md border-0 p-0"
          classNames={{
            months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
            month: "space-y-4",
            caption: "flex justify-center pt-1 relative items-center",
            caption_label: "text-sm font-medium",
            nav: "space-x-1 flex items-center",
            nav_button: "h-6 w-6 bg-transparent p-0 opacity-50 hover:opacity-100",
            nav_button_previous: "absolute left-1",
            nav_button_next: "absolute right-1",
            table: "w-full border-collapse space-y-1",
            head_row: "flex",
            head_cell: "text-muted-foreground rounded-md w-8 font-normal text-[0.7rem]",
            row: "flex w-full mt-2",
            cell: "h-8 w-8 text-center text-sm p-0 relative focus-within:relative focus-within:z-20",
            day: "h-8 w-8 p-0 font-normal aria-selected:opacity-100 text-xs hover:bg-accent hover:text-accent-foreground",
            day_selected:
              "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
            day_today: "bg-accent text-accent-foreground",
            day_outside: "text-muted-foreground opacity-50",
            day_disabled: "text-muted-foreground opacity-50",
            day_hidden: "invisible",
          }}
        />
      </div>

      <Separator />

      {/* Upcoming Events */}
      <div className="space-y-3">
        <h4 className="text-sm font-medium">Next 7 Days</h4>
        {upcomingEventsThisWeek.length > 0 ? (
          <div className="space-y-2">
            {upcomingEventsThisWeek.map((event) => (
              <Card key={event.id} className="border-l-4 border-l-blue-500 bg-muted/30">
                <CardContent className="p-3">
                  <div className="flex items-start justify-between">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        {event.type === "meeting" ? (
                          <Users className="h-3 w-3 text-muted-foreground flex-shrink-0" />
                        ) : (
                          <Briefcase className="h-3 w-3 text-muted-foreground flex-shrink-0" />
                        )}
                        <p className="text-xs font-medium truncate">{event.title}</p>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        <span>
                          {event.date.toLocaleDateString("en-GB", {
                            weekday: "short",
                            month: "short",
                            day: "numeric",
                          })}
                        </span>
                        <span>•</span>
                        <span>{event.time}</span>
                      </div>
                    </div>
                    <Badge
                      variant={event.type === "deadline" ? "destructive" : "default"}
                      className="text-xs ml-2 flex-shrink-0"
                    >
                      {event.type}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-4">
            <p className="text-sm text-muted-foreground">No upcoming events</p>
          </div>
        )}
      </div>
    </div>
  )
}
