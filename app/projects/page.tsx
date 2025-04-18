import { Plus } from "lucide-react"

import { Button } from "@/components/ui/button"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { ProjectList } from "@/components/project-list"
import { ProjectSearch } from "@/components/project-search"

export default function ProjectsPage() {
  return (
    <DashboardShell>
      <DashboardHeader heading="Projects" text="Manage your agency's projects and jobs">
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          New Project
        </Button>
      </DashboardHeader>
      <div className="space-y-4">
        <ProjectSearch />
        <ProjectList />
      </div>
    </DashboardShell>
  )
}
