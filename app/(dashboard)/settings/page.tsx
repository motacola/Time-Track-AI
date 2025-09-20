import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { DashboardHeader } from "@/components/dashboard-header"

export default function SettingsPage() {
  return (
    <div className="flex flex-col gap-6">
      <DashboardHeader
        heading="Settings"
        text="Manage your account settings and preferences"
      />

      <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
        <div className="md:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Settings Menu</CardTitle>
              <CardDescription>Navigate to different settings</CardDescription>
            </CardHeader>
            <CardContent>
              <nav className="flex flex-col space-y-2">
                <Button variant="ghost" className="justify-start" asChild>
                  <Link href="/settings">Account</Link>
                </Button>
                <Button variant="ghost" className="justify-start" asChild>
                  <Link href="/settings/notifications">Notifications</Link>
                </Button>
                <Button variant="ghost" className="justify-start" asChild>
                  <Link href="/settings/billing">Billing</Link>
                </Button>
                <Button variant="ghost" className="justify-start" asChild>
                  <Link href="/settings/integrations">Integrations</Link>
                </Button>
                <Button variant="ghost" className="justify-start" asChild>
                  <Link href="/settings/team">Team</Link>
                </Button>
              </nav>
            </CardContent>
          </Card>
        </div>

        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Account Settings</CardTitle>
              <CardDescription>Manage your account details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <h3 className="text-lg font-medium">Profile Information</h3>
                <p className="text-sm text-muted-foreground">Update your account profile information</p>
                <div className="grid grid-cols-1 gap-4">
                  <div className="space-y-1">
                    <label className="text-sm font-medium" htmlFor="name">
                      Name
                    </label>
                    <input id="name" className="w-full rounded-md border p-2" placeholder="Your name" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-sm font-medium" htmlFor="email">
                      Email
                    </label>
                    <input
                      id="email"
                      type="email"
                      className="w-full rounded-md border p-2"
                      placeholder="Your email"
                    />
                  </div>
                </div>
                <Button className="mt-4">Save Changes</Button>
              </div>

              <div className="space-y-2 border-t pt-6">
                <h3 className="text-lg font-medium">Password</h3>
                <p className="text-sm text-muted-foreground">Update your password</p>
                <div className="grid grid-cols-1 gap-4">
                  <div className="space-y-1">
                    <label className="text-sm font-medium" htmlFor="current-password">
                      Current Password
                    </label>
                    <input
                      id="current-password"
                      type="password"
                      className="w-full rounded-md border p-2"
                      placeholder="Current password"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-sm font-medium" htmlFor="new-password">
                      New Password
                    </label>
                    <input
                      id="new-password"
                      type="password"
                      className="w-full rounded-md border p-2"
                      placeholder="New password"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-sm font-medium" htmlFor="confirm-password">
                      Confirm New Password
                    </label>
                    <input
                      id="confirm-password"
                      type="password"
                      className="w-full rounded-md border p-2"
                      placeholder="Confirm new password"
                    />
                  </div>
                </div>
                <Button className="mt-4">Update Password</Button>
              </div>

              <div className="space-y-2 border-t pt-6">
                <h3 className="text-lg font-medium">Legal</h3>
                <p className="text-sm text-muted-foreground">Review our legal documents</p>
                <div className="space-y-2">
                  <Link href="/privacy-policy" className="block text-primary hover:underline">
                    Privacy Policy
                  </Link>
                  <Link href="/terms-of-service" className="block text-primary hover:underline">
                    Terms of Service
                  </Link>
                  <Link href="/cookie-policy" className="block text-primary hover:underline">
                    Cookie Policy
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
