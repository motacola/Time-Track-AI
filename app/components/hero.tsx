"use client"

import { useEffect, useMemo, useState } from "react"
import Link from "next/link"
import { ArrowRight, Mic, ShieldCheck, Sparkles, Zap } from "lucide-react"

import { Button } from "@/components/ui/button"
import { TypewriterEffect } from "./typewriter-effect"

const words = [
  { text: "Track" },
  { text: "your" },
  { text: "day" },
  { text: "in" },
  { text: "one" },
  {
    text: "sentence.",
    className: "text-blue-500 dark:text-blue-400",
  },
]

const voiceSamples = [
  {
    spoken: "Logged 2.5 hours refining the Nike landing animations and 30 minutes on stakeholder feedback.",
    highlights: [
      "Nike – Landing animations · 2.5h",
      "Stakeholder sync · 0.5h",
    ],
  },
  {
    spoken: "Wrapped copy edits for the fintech launch deck and updated QA bugs for the portal release.",
    highlights: [
      "Fintech deck copy edits · 1.7h",
      "Portal release QA fixes · 0.8h",
    ],
  },
  {
    spoken: "Shot social content for Truflow, exported reels, and coordinated the influencer deliverables.",
    highlights: [
      "Truflow social shoot · 2.2h",
      "Reel exports & influencer pack · 1.3h",
    ],
  },
]

const heroHighlights = [
  {
    title: "AI summaries",
    description: "Turn spoken updates into structured entries with context, budgets and tags.",
    icon: Sparkles,
    delay: "0s",
  },
  {
    title: "Billing ready",
    description: "Automatic job numbers, billable codes and handoff to finance systems.",
    icon: ShieldCheck,
    delay: "0.12s",
  },
  {
    title: "Realtime coaching",
    description: "Capacity hotspots and utilisation alerts surface before they hurt projects.",
    icon: Zap,
    delay: "0.24s",
  },
]

const heroStats = [
  { label: "Teams worldwide", value: "450+" },
  { label: "Hours captured", value: "12M" },
  { label: "Time saved / week", value: "6 hrs" },
]

export function HeroSection() {
  const [sampleIndex, setSampleIndex] = useState(0)
  const [waveHeights, setWaveHeights] = useState<number[]>([])

  const barIndexes = useMemo(() => Array.from({ length: 20 }, (_, i) => i), [])

  useEffect(() => {
    const interval = setInterval(() => {
      setSampleIndex((prev) => (prev + 1) % voiceSamples.length)
    }, 4200)

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    setWaveHeights(barIndexes.map(() => 16))

    const waveInterval = setInterval(() => {
      setWaveHeights((prev) =>
        prev.map(() => 12 + Math.floor(Math.random() * 40)),
      )
    }, 220)

    return () => clearInterval(waveInterval)
  }, [barIndexes])

  const activeSample = voiceSamples[sampleIndex]

  return (
    <section className="relative w-full overflow-hidden bg-white py-16 md:py-24 lg:py-32 xl:py-44 dark:bg-gray-950">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(120deg,rgba(59,130,246,0.18),rgba(37,99,235,0.35),rgba(147,197,253,0.18))] bg-[length:200%_200%] animate-hero-gradient" />
      <div className="pointer-events-none absolute -left-24 top-20 h-64 w-64 rounded-full bg-blue-400/25 blur-3xl animate-hero-blob" />
      <div className="pointer-events-none absolute -right-16 bottom-10 h-72 w-72 rounded-full bg-sky-300/25 blur-3xl animate-hero-blob" />

      <div className="container relative px-4 md:px-6">
        <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="space-y-8 text-center lg:text-left">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/40 bg-white/80 px-4 py-1.5 text-sm font-medium text-blue-700 shadow-lg backdrop-blur dark:bg-slate-900/70 dark:text-blue-100 animate-shimmer bg-[linear-gradient(110deg,rgba(255,255,255,0.4),rgba(59,130,246,0.7),rgba(255,255,255,0.4))] bg-[length:200%_100%]">
              <Sparkles className="h-4 w-4" />
              AI-native timesheets for creative teams
            </span>

            <div className="space-y-6">
              <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl md:text-6xl">
                Just say what you worked on.
                <span className="bg-gradient-to-br from-blue-600 via-blue-500 to-indigo-500 bg-clip-text text-transparent">
                  &nbsp;We&apos;ll take it from there.
                </span>
              </h1>
              <div className="h-10 text-lg text-blue-900 dark:text-blue-200 sm:h-12">
                <TypewriterEffect words={words} />
              </div>
              <p className="mx-auto max-w-2xl text-base text-slate-600 md:text-xl dark:text-slate-300 lg:mx-0">
                TimeTrack AI captures natural language updates, enriches them with project context and syncs everything
                to billing tools. No more chasing timesheets, no more lost hours.
              </p>
            </div>

            <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-stretch sm:gap-6 lg:items-center">
              <Button
                asChild
                className="relative inline-flex min-w-[200px] items-center justify-center gap-2 rounded-full bg-gradient-to-r from-blue-600 via-indigo-500 to-blue-500 px-8 py-3 text-base font-semibold shadow-lg shadow-blue-500/30 transition-all duration-200 hover:scale-[1.02] hover:shadow-xl"
              >
                <Link href="/signup">
                  Get started free
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="inline-flex items-center gap-2 rounded-full border-blue-200 px-7 py-3 text-base font-semibold text-blue-600 transition-colors duration-200 hover:border-blue-300 hover:bg-blue-50"
              >
                <Link href="/demo">
                  Watch 2-min demo
                  <Sparkles className="h-4 w-4" />
                </Link>
              </Button>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {heroHighlights.map(({ title, description, icon: Icon, delay }, index) => (
                <div
                  key={title}
                  className="group relative overflow-hidden rounded-2xl border border-white/50 bg-white/80 p-6 text-left shadow-lg backdrop-blur transition-transform duration-500 hover:-translate-y-1 hover:shadow-2xl dark:border-slate-800 dark:bg-slate-900/80 animate-float"
                  style={{ animationDelay: delay, animationDuration: `${6 + index}s` }}
                >
                  <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-full bg-blue-100 text-blue-600 shadow-sm">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-white">{title}</h3>
                  <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{description}</p>
                </div>
              ))}
            </div>

            <div className="grid gap-6 rounded-2xl border border-white/40 bg-white/70 p-6 backdrop-blur dark:border-slate-800 dark:bg-slate-900/80 sm:grid-cols-3">
              {heroStats.map((stat, index) => (
                <div key={stat.label} className="text-center" style={{ animationDelay: `${index * 0.15}s` }}>
                  <p className="animate-fade-up text-3xl font-semibold text-blue-600 sm:text-4xl">{stat.value}</p>
                  <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-xl overflow-hidden rounded-3xl border border-white/40 bg-white/80 p-6 shadow-2xl backdrop-blur dark:border-slate-800 dark:bg-slate-900/80 animate-scale-in">
            <div className="absolute -top-20 right-6 h-36 w-36 rounded-full bg-blue-400/20 blur-3xl" />
            <div className="absolute -bottom-16 left-0 h-24 w-24 rounded-full bg-indigo-400/20 blur-3xl" />

            <div className="relative flex items-center justify-between rounded-2xl border border-blue-100 bg-blue-50/90 px-4 py-3 text-blue-700 shadow-inner dark:border-blue-900/40 dark:bg-blue-950/40 dark:text-blue-200">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <span className="absolute inset-0 rounded-full border border-blue-400/60 animate-pulse-ring" />
                  <button
                    type="button"
                    className="relative flex h-12 w-12 items-center justify-center rounded-full bg-blue-600 text-white shadow-lg transition-transform duration-300 hover:scale-105"
                  >
                    <Mic className="h-5 w-5" />
                  </button>
                </div>
                <div className="text-left text-sm">
                  <p className="font-semibold">Voice capture enabled</p>
                  <p className="text-xs text-blue-200">Speak naturally – we capture every detail.</p>
                </div>
              </div>
              <span className="text-xs uppercase tracking-wide text-blue-100">Live</span>
            </div>

            <div className="relative mt-6 overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 shadow-lg dark:border-slate-800 dark:bg-slate-900">
              <p className="text-sm font-medium text-slate-500 dark:text-slate-300">You said</p>
              <p className="mt-2 text-base font-semibold text-slate-900 dark:text-white">
                “{activeSample.spoken}”
              </p>

              <div className="mt-4 flex h-16 items-end gap-[6px]">
                {barIndexes.map((index) => (
                  <span
                    key={`wave-${index}`}
                    className="w-[6px] rounded-full bg-gradient-to-b from-blue-500 via-indigo-500 to-blue-300 transition-all duration-200 ease-in-out"
                    style={{ height: `${waveHeights[index] ?? 14}px`, animationDelay: `${index * 80}ms` }}
                  />
                ))}
              </div>

              <div className="mt-5 rounded-xl border border-slate-200 bg-slate-50/60 p-4 text-sm text-slate-700 shadow-inner dark:border-slate-800 dark:bg-slate-900/80 dark:text-slate-200">
                <p className="mb-2 font-semibold text-slate-900 dark:text-white">TimeTrack AI converted it to:</p>
                <ul className="space-y-1">
                  {activeSample.highlights.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-left">
                      <span className="mt-1 h-2 w-2 rounded-full bg-blue-500" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-6 grid gap-3 text-sm text-slate-600 dark:text-slate-300">
              <div className="flex items-center justify-between rounded-xl border border-slate-200/70 bg-white/90 px-4 py-3 shadow-sm backdrop-blur dark:border-slate-800 dark:bg-slate-900/70">
                <span>Ready for client billing</span>
                <span className="text-blue-600">Auto-tagged</span>
              </div>
              <div className="flex items-center justify-between rounded-xl border border-slate-200/70 bg-white/90 px-4 py-3 shadow-sm backdrop-blur dark:border-slate-800 dark:bg-slate-900/70">
                <span>Capacity health check</span>
                <span className="text-blue-600">On track</span>
              </div>
              <div className="flex items-center justify-between rounded-xl border border-slate-200/70 bg-white/90 px-4 py-3 shadow-sm backdrop-blur dark:border-slate-800 dark:bg-slate-900/70">
                <span>Next action</span>
                <span className="text-blue-600">Send review summary</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

