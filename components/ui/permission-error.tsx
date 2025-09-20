"use client"

import { Button } from "@/components/ui/button"
import { ShieldAlert } from "lucide-react"
import { useRouter } from "next/navigation"

interface PermissionErrorProps {
  message?: string
  backUrl?: string
}

export function PermissionError({
  message = "You don't have permission to access this resource",
  backUrl = "/dashboard",
}: PermissionErrorProps) {
  const router = useRouter()

  return (
    <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-gray-300 bg-gray-50 p-8 text-center dark:border-gray-700 dark:bg-gray-900">
      <div className="mb-4 rounded-full bg-blue-100 p-3 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400">
        <ShieldAlert className="h-6 w-6" />
      </div>
      <h3 className="mb-2 text-lg font-medium">Access Denied</h3>
      <p className="mb-4 max-w-md text-sm text-gray-500 dark:text-gray-400">{message}</p>

      <Button variant="outline" onClick={() => router.push(backUrl)}>
        Go Back
      </Button>
    </div>
  )
}
