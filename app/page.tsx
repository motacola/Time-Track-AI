import Link from "next/link"
import { Clock, ArrowRight, Sparkles, Brain, Bot, CheckCircle } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center">
          <div className="mr-4 flex">
            <Link href="/" className="mr-8 flex items-center space-x-2">
              <Clock className="h-6 w-6 text-primary" />
              <span className="font-bold text-xl">AdTrack</span>
            </Link>
            <nav className="hidden md:flex items-center space-x-8 text-sm font-medium">
              <Link href="/features" className="transition-colors hover:text-primary">
                Features
              </Link>
              <Link href="/pricing" className="transition-colors hover:text-primary">
                Pricing
              </Link>
              <Link href="/about" className="transition-colors hover:text-primary">
                About
              </Link>
              <Link href="#" className="transition-colors hover:text-primary">
                Resources
              </Link>
            </nav>
          </div>
          <div className="ml-auto flex items-center space-x-4">
            <Link href="/login" className="hidden md:block">
              <Button variant="ghost" size="sm">
                Sign in
              </Button>
            </Link>
            <Link href="/register">
              <Button size="sm" className="bg-primary hover:bg-primary/90 text-white">
                Try AdTrack free
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-primary/10 -z-10"></div>
          <div className="container px-4 py-16 md:py-24 lg:py-32">
            <div className="grid gap-8 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="space-y-6">
                <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-sm font-medium text-primary">
                  TIME TRACKING SOFTWARE FOR ADVERTISING
                </div>
                <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
                  AI-powered time tracking for busy advertising teams
                </h1>
                <p className="text-xl text-muted-foreground">
                  AdTrack makes it easy to track time with AI assistance, so you get accurate data without the hassle.
                  Just describe what you worked on, and our AI does the rest.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button size="lg" className="bg-primary hover:bg-primary/90 text-white">
                    Try AdTrack Free
                  </Button>
                  <div className="text-sm text-muted-foreground mt-2 sm:mt-4">
                    Free 14-day trial. No credit card required.
                  </div>
                </div>
              </div>
              <div className="relative rounded-xl overflow-hidden shadow-2xl">
                <img
                  src="/placeholder.svg?height=600&width=800"
                  alt="Advertising team using AdTrack"
                  className="w-full h-auto"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Trusted By Section */}
        <section className="border-t border-b py-12">
          <div className="container px-4">
            <div className="text-center mb-8">
              <h2 className="text-lg font-medium text-muted-foreground">TRUSTED BY 5,000+ AGENCIES</h2>
            </div>
            <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
              <img src="/placeholder.svg?height=40&width=120" alt="Client logo" className="h-8 opacity-50" />
              <img src="/placeholder.svg?height=40&width=120" alt="Client logo" className="h-8 opacity-50" />
              <img src="/placeholder.svg?height=40&width=120" alt="Client logo" className="h-8 opacity-50" />
              <img src="/placeholder.svg?height=40&width=120" alt="Client logo" className="h-8 opacity-50" />
              <img src="/placeholder.svg?height=40&width=120" alt="Client logo" className="h-8 opacity-50" />
              <img src="/placeholder.svg?height=40&width=120" alt="Client logo" className="h-8 opacity-50" />
            </div>
          </div>
        </section>

        {/* How AdTrack Helps Section */}
        <section className="py-16 md:py-24 lg:py-32">
          <div className="container px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
                How AdTrack helps advertising teams
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Our AI-powered platform transforms time tracking from a chore into a seamless part of your workflow
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              <Card className="bg-background border-0 shadow-lg rounded-xl overflow-hidden">
                <div className="h-48 bg-muted/50 flex items-center justify-center">
                  <Brain className="h-16 w-16 text-primary/40" />
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-2">AI-Powered Time Entry</h3>
                  <p className="text-muted-foreground mb-4">
                    Simply describe what you worked on, and our AI will automatically categorize your time, assign it to
                    the right project, and fill in the details.
                  </p>
                  <Link href="/features" className="text-primary font-medium inline-flex items-center hover:underline">
                    Learn more <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </CardContent>
              </Card>

              <Card className="bg-background border-0 shadow-lg rounded-xl overflow-hidden">
                <div className="h-48 bg-muted/50 flex items-center justify-center">
                  <Bot className="h-16 w-16 text-primary/40" />
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-2">Smart Assistant</h3>
                  <p className="text-muted-foreground mb-4">
                    Our AI assistant reminds you to track time, suggests entries based on your calendar, and helps you
                    stay on top of your projects.
                  </p>
                  <Link href="/features" className="text-primary font-medium inline-flex items-center hover:underline">
                    Learn more <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </CardContent>
              </Card>

              <Card className="bg-background border-0 shadow-lg rounded-xl overflow-hidden">
                <div className="h-48 bg-muted/50 flex items-center justify-center">
                  <Sparkles className="h-16 w-16 text-primary/40" />
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-2">Intelligent Insights</h3>
                  <p className="text-muted-foreground mb-4">
                    Get AI-powered insights into team productivity, project profitability, and resource allocation to
                    make better business decisions.
                  </p>
                  <Link href="/features" className="text-primary font-medium inline-flex items-center hover:underline">
                    Learn more <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Feature Highlight Section */}
        <section className="py-16 md:py-24 lg:py-32 bg-muted/30">
          <div className="container px-4">
            <div className="grid gap-12 lg:grid-cols-2 items-center">
              <div className="order-2 lg:order-1">
                <div className="space-y-6">
                  <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-sm font-medium text-primary">
                    PROMPT-BASED TIME TRACKING
                  </div>
                  <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                    "I worked on the Acme billboard design for 3 hours"
                  </h2>
                  <p className="text-xl text-muted-foreground">
                    That's all it takes. Type or speak what you worked on, and our AI will automatically create a
                    detailed time entry with the right project, task, and description.
                  </p>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-primary mr-2 mt-0.5" />
                      <span>Natural language processing understands your work context</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-primary mr-2 mt-0.5" />
                      <span>Automatically matches to the right client and project</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-primary mr-2 mt-0.5" />
                      <span>Learns from your patterns to improve over time</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-primary mr-2 mt-0.5" />
                      <span>Works with voice input for hands-free time tracking</span>
                    </li>
                  </ul>
                  <div>
                    <Button className="bg-primary hover:bg-primary/90 text-white">See how it works</Button>
                  </div>
                </div>
              </div>
              <div className="order-1 lg:order-2 bg-white p-4 rounded-xl shadow-xl">
                <img
                  src="/placeholder.svg?height=400&width=600"
                  alt="AI-powered time entry interface"
                  className="w-full h-auto rounded-lg"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Testimonial Section */}
        <section className="py-16 md:py-24 lg:py-32">
          <div className="container px-4">
            <div className="max-w-3xl mx-auto text-center">
              <div className="inline-flex items-center justify-center rounded-full bg-primary/10 p-6 mb-6">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-10 w-10 text-primary"
                >
                  <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z" />
                  <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z" />
                </svg>
              </div>
              <blockquote className="text-2xl md:text-3xl font-medium mb-6">
                "AdTrack's AI has transformed how our agency handles time tracking. What used to take hours now takes
                minutes, and the data is more accurate than ever."
              </blockquote>
              <div className="flex items-center justify-center">
                <img
                  src="/placeholder.svg?height=60&width=60"
                  alt="Sarah Johnson"
                  className="h-12 w-12 rounded-full mr-4"
                />
                <div className="text-left">
                  <div className="font-medium">Sarah Johnson</div>
                  <div className="text-sm text-muted-foreground">Creative Director, Pixel Perfect Agency</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 md:py-24 lg:py-32 bg-primary text-primary-foreground">
          <div className="container px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-6">
                Ready to transform your agency's time tracking?
              </h2>
              <p className="text-xl text-primary-foreground/80 mb-8">
                Join thousands of agencies that have streamlined their operations with AdTrack's AI-powered platform.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Button size="lg" variant="secondary">
                  Try AdTrack Free
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="bg-transparent text-primary-foreground border-primary-foreground/20 hover:bg-primary-foreground/10"
                >
                  Request a Demo
                </Button>
              </div>
              <div className="mt-4 text-sm text-primary-foreground/70">Free 14-day trial. No credit card required.</div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t py-12 bg-muted/30">
        <div className="container px-4">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4 mb-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Clock className="h-6 w-6 text-primary" />
                <span className="font-bold text-xl">AdTrack</span>
              </div>
              <p className="text-muted-foreground mb-4">
                AI-powered time tracking software for advertising agencies and creative teams.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-muted-foreground hover:text-primary">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-5 w-5"
                  >
                    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                  </svg>
                </a>
                <a href="#" className="text-muted-foreground hover:text-primary">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-5 w-5"
                  >
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                    <rect width="4" height="12" x="2" y="9"></rect>
                    <circle cx="4" cy="4" r="2"></circle>
                  </svg>
                </a>
                <a href="#" className="text-muted-foreground hover:text-primary">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-5 w-5"
                  >
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                  </svg>
                </a>
              </div>
            </div>
            <div>
              <h3 className="font-medium mb-4">Product</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-muted-foreground hover:text-primary">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#" className="text-muted-foreground hover:text-primary">
                    Pricing
                  </a>
                </li>
                <li>
                  <a href="#" className="text-muted-foreground hover:text-primary">
                    Integrations
                  </a>
                </li>
                <li>
                  <a href="#" className="text-muted-foreground hover:text-primary">
                    AI Capabilities
                  </a>
                </li>
                <li>
                  <a href="#" className="text-muted-foreground hover:text-primary">
                    Security
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium mb-4">Resources</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-muted-foreground hover:text-primary">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="text-muted-foreground hover:text-primary">
                    Guides
                  </a>
                </li>
                <li>
                  <a href="#" className="text-muted-foreground hover:text-primary">
                    Case Studies
                  </a>
                </li>
                <li>
                  <a href="#" className="text-muted-foreground hover:text-primary">
                    Help Center
                  </a>
                </li>
                <li>
                  <a href="#" className="text-muted-foreground hover:text-primary">
                    API Documentation
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium mb-4">Company</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-muted-foreground hover:text-primary">
                    About
                  </a>
                </li>
                <li>
                  <a href="#" className="text-muted-foreground hover:text-primary">
                    Careers
                  </a>
                </li>
                <li>
                  <a href="#" className="text-muted-foreground hover:text-primary">
                    Contact
                  </a>
                </li>
                <li>
                  <a href="#" className="text-muted-foreground hover:text-primary">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="text-muted-foreground hover:text-primary">
                    Terms of Service
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t pt-8 text-center text-sm text-muted-foreground">
            <p>© 2024 AdTrack. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
