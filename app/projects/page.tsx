import { Suspense } from "react"
import { createClient } from "@/lib/supabase/server"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { LoadingFallback } from "@/components/ui/loading-fallback"
import ProjectList from "@/components/project-list"

export default async function ProjectsPage() {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)

  // Check if user is authenticated
  const { data: sessionData } = await supabase.auth.getSession()

  if (!sessionData.session) {
    // User is not logged in, redirect to login
    redirect("/login")
  }

  return (
    <div className="container py-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Projects</h1>
      </div>

      <Suspense
        fallback={<LoadingFallback title="Loading projects" description="Please wait while we fetch your projects" />}
      >
        <ProjectList />
      </Suspense>
    </div>
  )
}
