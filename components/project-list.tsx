import { MoreHorizontal, Pencil, Trash2 } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Progress } from "@/components/ui/progress"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export function ProjectList() {
  // This would typically come from your database
  const projects = [
    {
      id: "1",
      name: "Website Redesign",
      client: "Acme Corp",
      startDate: "Aug 15, 2024",
      dueDate: "Oct 15, 2024",
      budget: "$15,000",
      hoursLogged: 120,
      budgetedHours: 160,
      progress: 75,
      status: "Active",
    },
    {
      id: "2",
      name: "Social Media Campaign",
      client: "TechStart",
      startDate: "Sep 1, 2024",
      dueDate: "Oct 18, 2024",
      budget: "$8,000",
      hoursLogged: 48,
      budgetedHours: 80,
      progress: 60,
      status: "Active",
    },
    {
      id: "3",
      name: "Brand Identity",
      client: "FreshFoods",
      startDate: "Sep 10, 2024",
      dueDate: "Oct 22, 2024",
      budget: "$12,000",
      hoursLogged: 32,
      budgetedHours: 80,
      progress: 40,
      status: "Active",
    },
    {
      id: "4",
      name: "Video Production",
      client: "SportsFit",
      startDate: "Sep 15, 2024",
      dueDate: "Oct 25, 2024",
      budget: "$20,000",
      hoursLogged: 40,
      budgetedHours: 160,
      progress: 25,
      status: "Active",
    },
    {
      id: "5",
      name: "Email Marketing",
      client: "BookWorm",
      startDate: "Aug 1, 2024",
      dueDate: "Sep 15, 2024",
      budget: "$5,000",
      hoursLogged: 40,
      budgetedHours: 40,
      progress: 100,
      status: "Completed",
    },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Projects</CardTitle>
        <CardDescription>Manage your agency's projects and jobs</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Project</TableHead>
              <TableHead>Client</TableHead>
              <TableHead>Timeline</TableHead>
              <TableHead>Budget</TableHead>
              <TableHead>Progress</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {projects.map((project) => (
              <TableRow key={project.id}>
                <TableCell className="font-medium">{project.name}</TableCell>
                <TableCell>{project.client}</TableCell>
                <TableCell>
                  <div className="flex flex-col">
                    <span className="text-xs text-muted-foreground">Start: {project.startDate}</span>
                    <span className="text-xs text-muted-foreground">Due: {project.dueDate}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex flex-col">
                    <span>{project.budget}</span>
                    <span className="text-xs text-muted-foreground">
                      {project.hoursLogged} / {project.budgetedHours} hrs
                    </span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex w-full max-w-xs items-center gap-2">
                    <Progress value={project.progress} className="h-2" />
                    <span className="w-12 text-xs">{project.progress}%</span>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge
                    variant={
                      project.status === "Completed" ? "success" : project.status === "Active" ? "default" : "secondary"
                    }
                  >
                    {project.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Actions</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <Pencil className="mr-2 h-4 w-4" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive">
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
