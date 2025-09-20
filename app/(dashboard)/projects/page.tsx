import { Suspense } from "react"
import { Plus } from "lucide-react"

import ProjectList, { ProjectListSkeleton } from "@/components/project-list"
import { DashboardHeader } from "@/components/dashboard-header"
import { Button } from "@/components/ui/button"

export default async function ProjectsPage() {
  return (
    <div className="flex flex-col gap-6">
      <DashboardHeader heading="Projects" text="Manage client engagements and keep delivery on track.">
        <Button size="sm" className="gap-2">
          <Plus className="h-4 w-4" />
          New Project
        </Button>
      </DashboardHeader>

      <section className="space-y-6">
        <Suspense fallback={<ProjectListSkeleton />}>
          <ProjectList />
        </Suspense>
      </section>
    </div>
  )
}
