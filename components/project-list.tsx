"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Clock } from "lucide-react"
import { createClient } from "@/lib/supabase/client"
import { LoadingFallback } from "@/components/ui/loading-fallback"
import { EmptyState } from "@/components/ui/empty-state"
import { DatabaseError } from "@/components/ui/database-error"
import { logger } from "@/lib/logger"

export default function ProjectList() {
  const [projects, setProjects] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true)
        const { data, error } = await supabase.from("projects").select("*").order("created_at", { ascending: false })

        if (error) {
          throw error
        }

        setProjects(data || [])
      } catch (err) {
        logger.error("Error fetching projects", err instanceof Error ? err : new Error(String(err)))
        setError(err instanceof Error ? err : new Error(String(err)))
      } finally {
        setLoading(false)
      }
    }

    fetchProjects()
  }, [])

  const handleLogTime = (projectId: string, projectName: string, jobNumber: string) => {
    router.push(
      `/timesheet/new?project=${projectId}&projectName=${encodeURIComponent(projectName)}&jobNumber=${encodeURIComponent(jobNumber || "")}`,
    )
  }

  if (loading) {
    return <LoadingFallback title="Loading projects" description="Please wait while we fetch your projects" />
  }

  if (error) {
    return <DatabaseError message="There was an error loading your projects" onRetry={() => window.location.reload()} />
  }

  if (projects.length === 0) {
    return (
      <EmptyState
        title="No projects found"
        description="You don't have any projects yet. Create your first project to get started."
        actionLabel="Create Project"
        onAction={() => router.push("/projects/new")}
      />
    )
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {projects.map((project) => (
        <Card key={project.id} className="overflow-hidden">
          <CardHeader className="bg-gray-50 dark:bg-gray-800">
            <CardTitle className="flex items-center justify-between">
              <span className="truncate">{project.name}</span>
              <Badge variant="outline">{project.status}</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4">
            <div className="mb-4 space-y-2">
              <div className="text-sm text-gray-500 dark:text-gray-400">
                Client: <span className="font-medium text-gray-700 dark:text-gray-300">{project.client}</span>
              </div>
              {project.job_number && (
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  Job Number: <span className="font-medium text-gray-700 dark:text-gray-300">{project.job_number}</span>
                </div>
              )}
              <div className="text-sm text-gray-500 dark:text-gray-400">
                Deadline:{" "}
                <span className="font-medium text-gray-700 dark:text-gray-300">
                  {project.deadline ? new Date(project.deadline).toLocaleDateString("en-GB") : "No deadline"}
                </span>
              </div>
            </div>
            <Button
              variant="default"
              className="w-full"
              onClick={() => handleLogTime(project.id, project.name, project.job_number || "")}
            >
              <Clock className="mr-2 h-4 w-4" />
              Log Time
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
