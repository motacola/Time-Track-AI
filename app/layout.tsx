import type React from "react"
import { NavbarWrapper } from "./components/navbar-wrapper"
import { ThemeProvider } from "@/components/theme-provider"
import "./globals.css"

export const metadata = {
  title: "TimeTrack AI - Effortless Time Tracking",
  description: "AI-powered timesheet tool for agencies and professionals",
  generator: "v0.dev",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <div className="flex min-h-screen flex-col">
            <NavbarWrapper />
            <main className="flex-1">
              {children}
            </main>
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
