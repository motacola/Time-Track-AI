"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Clock, Menu, X } from "lucide-react"
import { useState } from "react"
import { Button } from "@/components/ui/button"

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pathname = usePathname()

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  // Check if the current path is a dashboard path
  const isDashboardPath =
    pathname.startsWith("/dashboard") ||
    pathname.startsWith("/timesheet") ||
    pathname.startsWith("/projects") ||
    pathname.startsWith("/clients") ||
    pathname.startsWith("/reports") ||
    pathname.startsWith("/ai-insights")

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <Clock className="h-6 w-6" />
            <span className="font-bold">TimeTrack AI</span>
          </Link>
          {!isDashboardPath && (
            <nav className="hidden items-center space-x-6 text-sm font-medium md:flex">
              <Link
                href="/features"
                className={`transition-colors hover:text-foreground/80 ${
                  pathname === "/features" ? "text-foreground" : "text-foreground/60"
                }`}
              >
                Features
              </Link>
              <Link
                href="/pricing"
                className={`transition-colors hover:text-foreground/80 ${
                  pathname === "/pricing" ? "text-foreground" : "text-foreground/60"
                }`}
              >
                Pricing
              </Link>
              <Link
                href="/about"
                className={`transition-colors hover:text-foreground/80 ${
                  pathname === "/about" ? "text-foreground" : "text-foreground/60"
                }`}
              >
                About
              </Link>
            </nav>
          )}
        </div>
        <div className="ml-auto flex items-center space-x-3">
          {isDashboardPath ? (
            <Link href="/dashboard">
              <Button variant="ghost" size="sm">
                Dashboard
              </Button>
            </Link>
          ) : (
            <>
              <Link href="/login">
                <Button size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90">
                  Login
                </Button>
              </Link>
              <Link href="/register">
                <Button size="sm" variant="outline">
                  Get Started
                </Button>
              </Link>
            </>
          )}
          {!isDashboardPath && (
            <button className="md:hidden" onClick={toggleMenu}>
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          )}
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && !isDashboardPath && (
        <div className="md:hidden">
          <div className="space-y-1 px-4 py-3">
            <Link
              href="/features"
              className="block py-2 text-base font-medium text-foreground/60 hover:text-foreground"
              onClick={toggleMenu}
            >
              Features
            </Link>
            <Link
              href="/pricing"
              className="block py-2 text-base font-medium text-foreground/60 hover:text-foreground"
              onClick={toggleMenu}
            >
              Pricing
            </Link>
            <Link
              href="/about"
              className="block py-2 text-base font-medium text-foreground/60 hover:text-foreground"
              onClick={toggleMenu}
            >
              About
            </Link>
            <Link
              href="/login"
              className="block py-2 text-base font-medium text-primary hover:text-primary/80"
              onClick={toggleMenu}
            >
              Login
            </Link>
            <Link
              href="/register"
              className="block py-2 text-base font-medium text-foreground/60 hover:text-foreground"
              onClick={toggleMenu}
            >
              Get Started
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}
