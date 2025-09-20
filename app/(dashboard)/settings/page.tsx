import Link from "next/link"
import {
  ArrowRight,
  Check,
  CreditCard,
  Globe,
  Keyboard,
  Mic,
  ShieldCheck,
  Users,
} from "lucide-react"

import { DashboardHeader } from "@/components/dashboard-header"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"

const notificationSettings = [
  {
    id: "weekly-digest",
    title: "Weekly performance digest",
    description: "Summary of utilisation, billable targets and project health",
    defaultEnabled: true,
  },
  {
    id: "approvals",
    title: "Timesheet approvals",
    description: "Notify me when my team submits or requires approval",
    defaultEnabled: true,
  },
  {
    id: "insight-alerts",
    title: "AI insight alerts",
    description: "Real-time alerts when AI detects risk or opportunity",
    defaultEnabled: false,
  },
  {
    id: "integrations",
    title: "Integration status",
    description: "Connection errors or sync delays from linked tools",
    defaultEnabled: true,
  },
]

const connectedIntegrations = [
  { name: "Slack", status: "Connected", description: "Push daily reminders to #timesheets" },
  { name: "Google Calendar", status: "Syncing", description: "Convert meetings into draft entries" },
  { name: "QuickBooks", status: "Action required", description: "Reconnect to resume invoice exports" },
]

export default function SettingsPage() {
  return (
    <div className="flex flex-col gap-6">
      <DashboardHeader
        heading="Settings"
        text="Configure your workspace, account and notifications to match the way your team operates."
      >
        <Button variant="outline" size="sm" className="gap-2">
          <Users className="h-4 w-4" />
          Manage Team
        </Button>
      </DashboardHeader>

      <Alert className="border-blue-200 bg-blue-50 text-blue-900 dark:border-blue-900/40 dark:bg-blue-950/30 dark:text-blue-200">
        <ShieldCheck className="h-5 w-5" />
        <AlertTitle>Enhance your account security</AlertTitle>
        <AlertDescription>
          Two-factor authentication is not enabled. Add an authenticator app to protect billing and client data.
        </AlertDescription>
      </Alert>

      <div className="grid gap-8 lg:grid-cols-[320px_1fr]">
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Your profile completeness</CardTitle>
              <CardDescription>Finish the checklist to help teammates recognise your expertise.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Progress value={72} className="h-2" />
                <p className="mt-2 text-sm text-muted-foreground">72% complete · 2 steps remaining</p>
              </div>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-500" /> Upload profile photo
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-500" /> Add job title & department
                </li>
                <li className="flex items-center gap-2 text-muted-foreground">
                  <ArrowRight className="h-4 w-4" /> Share your working hours
                </li>
                <li className="flex items-center gap-2 text-muted-foreground">
                  <ArrowRight className="h-4 w-4" /> Add emergency contact
                </li>
              </ul>
              <Button variant="outline" size="sm" className="w-full">
                Complete profile
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Plan usage</CardTitle>
              <CardDescription>Professional plan · Billed annually</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div className="flex items-center justify-between">
                <span>Seats</span>
                <span className="font-medium">18 / 25</span>
              </div>
              <Progress value={72} className="h-2" />
              <div className="flex items-center justify-between text-muted-foreground">
                <span>AI tasks this month</span>
                <span>1,240 / 2,000</span>
              </div>
              <div className="flex items-center justify-between text-muted-foreground">
                <span>Storage</span>
                <span>68% used</span>
              </div>
                <Button variant="outline" size="sm" className="w-full gap-2">
                  <CreditCard className="h-4 w-4" /> Manage billing
                </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Quick actions</CardTitle>
              <CardDescription>Frequently performed workspace tasks</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-2">
              <Button variant="outline" className="justify-start gap-2" asChild>
                <Link href="/timesheet/new?tab=voice">
                  <Mic className="h-4 w-4" /> Submit voice entry
                </Link>
              </Button>
              <Button variant="outline" className="justify-start gap-2" asChild>
                <Link href="/projects">
                  <ArrowRight className="h-4 w-4" /> Configure project templates
                </Link>
              </Button>
              <Button variant="outline" className="justify-start gap-2" asChild>
                <Link href="/reports">
                  <ArrowRight className="h-4 w-4" /> Schedule utilisation report
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Profile & contact</CardTitle>
              <CardDescription>These details appear in approvals and client-facing reports.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="first-name">First name</Label>
                  <Input id="first-name" placeholder="Alex" defaultValue="Alex" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="last-name">Last name</Label>
                  <Input id="last-name" placeholder="Morgan" defaultValue="Morgan" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="role">Role</Label>
                  <Input id="role" placeholder="Operations Director" defaultValue="Operations Director" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Work email</Label>
                  <Input id="email" type="email" placeholder="alex@agency.com" defaultValue="alex@agency.com" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="bio">Team bio</Label>
                <Textarea
                  id="bio"
                  placeholder="Short introduction for teammates and approvers"
                  defaultValue="Leads resourcing and delivery operations for North America. Passionate about design ops and revenue visibility."
                  rows={3}
                />
              </div>
              <div className="flex justify-end">
                <Button size="sm">Save profile</Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Workspace preferences</CardTitle>
              <CardDescription>Control how dates, time and notifications behave for your account.</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label>Timezone</Label>
                <Select defaultValue="est">
                  <SelectTrigger>
                    <SelectValue placeholder="Select timezone" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="est">Eastern (EST)</SelectItem>
                    <SelectItem value="pst">Pacific (PST)</SelectItem>
                    <SelectItem value="gmt">Greenwich (GMT)</SelectItem>
                    <SelectItem value="cet">Central Europe (CET)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Week starts on</Label>
                <Select defaultValue="monday">
                  <SelectTrigger>
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="monday">Monday</SelectItem>
                    <SelectItem value="sunday">Sunday</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="default-rate">Default billable rate</Label>
                <div className="flex items-center gap-2">
                  <span className="text-muted-foreground">$</span>
                  <Input id="default-rate" type="number" min="0" step="5" defaultValue="125" />
                  <span className="text-muted-foreground">per hour</span>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="dashboard-insights" className="text-sm font-medium">
                    Show project insights on dashboard
                  </Label>
                  <Switch id="dashboard-insights" defaultChecked />
                </div>
                <p className="text-xs text-muted-foreground">
                  When enabled, AI highlights are surfaced on your personal dashboard every morning.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Notifications</CardTitle>
              <CardDescription>Decide which events reach your inbox or Slack channels.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {notificationSettings.map((item) => (
                <div key={item.id} className="flex items-start justify-between gap-4">
                  <div>
                    <p className="font-medium">{item.title}</p>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                  </div>
                  <Switch id={`notification-${item.id}`} defaultChecked={item.defaultEnabled} aria-label={item.title} />
                </div>
              ))}
              <div className="flex items-start justify-between gap-4 border-t pt-4">
                <div>
                  <p className="font-medium">Send mobile push alerts</p>
                  <p className="text-sm text-muted-foreground">
                    Requires the TimeTrack AI mobile app and an active login session.
                  </p>
                </div>
                <Switch id="notification-mobile" aria-label="Mobile push alerts" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Security</CardTitle>
              <CardDescription>Keep client and financial data protected.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between rounded-lg border p-3">
                <div>
                  <p className="font-medium">Two-factor authentication</p>
                  <p className="text-sm text-muted-foreground">
                    Add an authenticator app or security key for MFA prompts on login.
                  </p>
                </div>
                <Button variant="outline" size="sm" className="gap-2">
                  <ShieldCheck className="h-4 w-4" /> Enable MFA
                </Button>
              </div>
              <div className="flex items-center justify-between rounded-lg border p-3">
                <div>
                  <p className="font-medium">Active sessions</p>
                  <p className="text-sm text-muted-foreground">
                    Manage devices that currently have access to your workspace.
                  </p>
                </div>
                <Button variant="outline" size="sm">View sessions</Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Connected integrations</CardTitle>
              <CardDescription>Control how TimeTrack AI exchanges data with your existing stack.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {connectedIntegrations.map((integration) => (
                <div key={integration.name} className="flex items-start justify-between gap-4 rounded-lg border p-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="font-medium">{integration.name}</p>
                      <Badge variant="outline">{integration.status}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{integration.description}</p>
                  </div>
                  <Button variant="outline" size="sm">
                    Manage
                  </Button>
                </div>
              ))}
              <div className="flex items-center justify-between rounded-lg border p-3">
                <div className="flex items-center gap-2">
                  <Globe className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">Need a new integration?</span>
                </div>
                <Button variant="ghost" size="sm" className="gap-1" asChild>
                  <Link href="/integrations">
                    Browse directory
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
