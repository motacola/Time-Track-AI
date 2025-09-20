import { PricingTable } from "./components/pricing-table"
import { FaqAccordion } from "./components/faq-accordion"
import { HowItWorks } from "./components/how-it-works"
import { Benefits } from "./components/benefits"
import { Footer } from "./components/footer"
import { HeroSection } from "./components/hero"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <HeroSection />

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
            <div className="mx-auto max-w-3xl overflow-hidden rounded-3xl border border-white/60 bg-white shadow-xl dark:border-slate-800 dark:bg-slate-900">
              <div className="relative p-6">
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-400/60 to-transparent" />
                <div className="space-y-4">
                  <div className="flex items-start space-x-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                      <span className="text-lg">👤</span>
                    </div>
                    <div className="flex-1 rounded-2xl bg-slate-100 p-4 text-left text-sm dark:bg-slate-800">
                      I spent 2 hours designing the new campaign for Acme Corp and 1 hour in a client meeting.
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 text-white">
                      <span className="text-lg">🤖</span>
                    </div>
                    <div className="flex-1 rounded-2xl bg-blue-50 p-4 text-left text-sm text-blue-900 shadow-inner dark:bg-blue-950/60 dark:text-blue-100">
                      <strong className="block text-sm">Timesheet updated</strong>
                      <span>• Acme Corp – Design: 2 hours</span>
                      <br />• Acme Corp – Client Meeting: 1 hour
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

