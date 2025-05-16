"use client"

import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import { AlertCircle, RefreshCw, LogOut } from "lucide-react"
import { useRouter } from "next/navigation"
// import { createClient } from "@/lib/supabase/client" // Removed supabase client import

export default function DashboardError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  const router = useRouter()

  useEffect(() => {
    // Log the error
    console.error("Dashboard error:", error)
  }, [error])

  // Simplify the logout function to just redirect to login
  // This avoids using the Supabase client directly in the error boundary
  const handleLogout = () => {
    router.push("/login")
  }

  return (
    <div className="flex min-h-[80vh] flex-col items-center justify-center p-4">
      <div className="w-full max-w-md rounded-lg border border-red-200 bg-red-50 p-6 text-center dark:border-red-900/50 dark:bg-red-900/10">
        <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-red-100 text-red-600 dark:bg-red-900/20 dark:text-red-400">
          <AlertCircle className="h-6 w-6" />
        </div>
        <h2 className="mb-2 text-xl font-semibold text-red-800 dark:text-red-400">Dashboard Error</h2>
        <p className="mb-4 text-red-700 dark:text-red-300">
          We encountered an error loading your dashboard. This could be due to a temporary issue with our servers or
          your connection.
        </p>
        {error.digest && (
          <p className="mb-4 text-sm text-red-600 dark:text-red-400">
            Error reference: <code className="rounded bg-red-100 px-1 py-0.5 dark:bg-red-900/30">{error.digest}</code>
          </p>
        )}
        <div className="flex flex-col gap-2 sm:flex-row sm:justify-center">
          <Button onClick={reset} className="flex items-center gap-2">
            <RefreshCw className="h-4 w-4" />
            Try Again
          </Button>
          <Button variant="outline" onClick={handleLogout} className="flex items-center gap-2">
            <LogOut className="h-4 w-4" />
            Sign Out
          </Button>
        </div>
      </div>
    </div>
  )
}
