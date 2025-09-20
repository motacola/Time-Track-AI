import Link from "next/link"
import { ArrowRight, ShieldCheck, Sparkles, Zap } from "lucide-react"

import { Button } from "@/components/ui/button"
import { TypewriterEffect } from "./components/typewriter-effect"
import { PricingTable } from "./components/pricing-table"
import { FaqAccordion } from "./components/faq-accordion"
import { HowItWorks } from "./components/how-it-works"
import { Benefits } from "./components/benefits"
import { Footer } from "./components/footer"

export default function Home() {
  const words = [
    {
      text: "Track",
    },
    {
      text: "your",
    },
    {
      text: "day",
    },
    {
      text: "in",
    },
    {
      text: "one",
    },
    {
      text: "sentence.",
      className: "text-blue-500 dark:text-blue-500",
    },
  ]

  const heroHighlights = [
    {
      title: "AI summaries",
      description: "Turn spoken updates into structured entries with one click.",
      icon: Sparkles,
      delay: "0s",
    },
    {
      title: "Billing ready",
      description: "Automatic job numbers and billable tagging for finance teams.",
      icon: ShieldCheck,
      delay: "0.15s",
    },
    {
      title: "Realtime coaching",
      description: "See capacity hotspots and utilisation trends instantly.",
      icon: Zap,
      delay: "0.3s",
    },
  ]

  const heroStats = [
    { label: "Teams worldwide", value: "450+" },
    { label: "Hours captured", value: "12M" },
    { label: "Time saved / week", value: "6 hrs" },
  ]

  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      {/* Hero Section */}
      <section className="relative w-full overflow-hidden bg-white py-16 md:py-24 lg:py-32 xl:py-44 dark:bg-gray-950">
        <div className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(120deg,rgba(59,130,246,0.15),rgba(37,99,235,0.3),rgba(147,197,253,0.2))] bg-[length:200%_200%] animate-hero-gradient" />
        <div className="pointer-events-none absolute -left-24 top-20 h-64 w-64 rounded-full bg-blue-400/30 blur-3xl animate-hero-blob" />
        <div className="pointer-events-none absolute -right-16 bottom-10 h-72 w-72 rounded-full bg-sky-300/30 blur-3xl animate-hero-blob" />

        <div className="container relative px-4 md:px-6">
          <div className="mx-auto flex max-w-5xl flex-col items-center gap-10 text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/40 bg-white/80 px-4 py-1.5 text-sm font-medium text-blue-700 shadow-lg backdrop-blur dark:bg-slate-900/70 dark:text-blue-100 animate-shimmer bg-[linear-gradient(110deg,rgba(255,255,255,0.4),rgba(59,130,246,0.7),rgba(255,255,255,0.4))] bg-[length:200%_100%]">
              <Sparkles className="h-4 w-4" />
              AI-native timesheets for creative agencies
            </span>

            <div className="space-y-6">
              <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl md:text-6xl lg:text-6xl">
                Just say what you worked on.
                <span className="bg-gradient-to-br from-blue-600 via-blue-500 to-indigo-500 bg-clip-text text-transparent">
                  &nbsp;We&apos;ll take it from there.
                </span>
              </h1>
              <div className="h-10 text-lg text-blue-900 dark:text-blue-200 sm:h-12">
                <TypewriterEffect words={words} />
              </div>
              <p className="mx-auto max-w-3xl text-base text-slate-600 md:text-xl dark:text-slate-300">
                TimeTrack AI captures natural language updates, enriches them with context, and syncs everything to your
                project and billing tools. No more chasing timesheets, no more lost hours.
              </p>
            </div>

            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6">
              <Button
                asChild
                className="relative inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-600 via-indigo-500 to-blue-500 px-8 py-3 text-base font-semibold shadow-lg shadow-blue-500/30 transition-transform duration-200 hover:scale-[1.02] hover:shadow-xl"
              >
                <Link href="/signup">
                  Get started free
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="inline-flex items-center gap-2 rounded-full border-blue-200 px-7 py-3 text-base font-semibold text-blue-600 transition-colors duration-200 hover:border-blue-400 hover:bg-blue-50"
              >
                <Link href="/demo">
                  Watch 2-min demo
                  <Sparkles className="h-4 w-4" />
                </Link>
              </Button>
            </div>

            <div className="grid w-full gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {heroHighlights.map(({ title, description, icon: Icon, delay }) => (
                <div
                  key={title}
                  className="group relative overflow-hidden rounded-2xl border border-white/50 bg-white/80 p-6 text-left shadow-lg backdrop-blur transition-transform duration-500 hover:-translate-y-1 hover:shadow-2xl dark:border-slate-800 dark:bg-slate-900/80 animate-float"
                  style={{ animationDelay: delay }}
                >
                  <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-full bg-blue-100 text-blue-600 shadow-sm">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-white">{title}</h3>
                  <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{description}</p>
                </div>
              ))}
            </div>

            <div className="grid w-full max-w-3xl grid-cols-1 gap-6 rounded-2xl border border-white/40 bg-white/70 p-6 backdrop-blur dark:border-slate-800 dark:bg-slate-900/80 sm:grid-cols-3">
              {heroStats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <p className="text-3xl font-semibold text-blue-600 sm:text-4xl">{stat.value}</p>
                  <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Demo Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-50 dark:bg-gray-900">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Simple time tracking for busy professionals
              </h2>
              <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                No more complicated forms or spreadsheets. Just tell us what you did.
              </p>
            </div>
            <div className="mx-auto max-w-3xl border rounded-lg overflow-hidden shadow-lg bg-white dark:bg-gray-800">
              <div className="p-6">
                <div className="space-y-4">
                  <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                      <span className="text-blue-600">👤</span>
                    </div>
                    <div className="flex-1 p-4 bg-gray-100 dark:bg-gray-700 rounded-lg">
                      <p className="text-sm">
                        I spent 2 hours designing the new campaign for Acme Corp and 1 hour in a client meeting.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center">
                      <span className="text-white">🤖</span>
                    </div>
                    <div className="flex-1 p-4 bg-blue-100 dark:bg-blue-900 rounded-lg">
                      <p className="text-sm">
                        <strong>Timesheet updated:</strong>
                        <br />• Acme Corp - Design: 2 hours
                        <br />• Acme Corp - Client Meeting: 1 hour
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <Benefits />

      {/* How It Works Section */}
      <HowItWorks />

      {/* Pricing Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-white dark:bg-gray-950">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Simple, transparent pricing
              </h2>
              <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                Choose the plan that&apos;s right for your team
              </p>
            </div>
            <PricingTable />
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-50 dark:bg-gray-900">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center mb-12">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Frequently asked questions
              </h2>
              <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                Everything you need to know about our timesheet tool
              </p>
            </div>
          </div>
          <div className="mx-auto max-w-3xl">
            <FaqAccordion />
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </main>
  )
}
