import { getSession } from "@/app/actions/auth"

export default async function DebugPage() {
  const session = await getSession()

  return (
    <div className="container mx-auto flex min-h-screen flex-col items-center justify-center p-4">
      <h1 className="mb-8 text-3xl font-bold">Debug Tools</h1>

      <div className="w-full max-w-md rounded-lg bg-white p-6 shadow dark:bg-gray-800">
        <h2 className="mb-4 text-xl font-semibold">Authentication Status</h2>

        {session ? (
          <div className="space-y-4">
            <div className="rounded-md bg-green-50 p-4 dark:bg-green-900/20">
              <p className="text-green-800 dark:text-green-400">Authenticated</p>
            </div>

            <div className="space-y-2">
              <p>
                <strong>User ID:</strong> {session.user.id}
              </p>
              <p>
                <strong>Email:</strong> {session.user.email}
              </p>
              <p>
                <strong>Session Expires:</strong> {new Date(session.expires_at! * 1000).toLocaleString()}
              </p>
            </div>
          </div>
        ) : (
          <div className="rounded-md bg-red-50 p-4 dark:bg-red-900/20">
            <p className="text-red-800 dark:text-red-400">Not authenticated</p>
          </div>
        )}
      </div>
    </div>
  )
}
