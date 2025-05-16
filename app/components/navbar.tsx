"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { ChevronDown, User } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { user, signOut } = useAuth()

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .toUpperCase()
  }

  return (
    <header className="w-full bg-white dark:bg-gray-950 border-b border-gray-200 dark:border-gray-800 sticky top-0 z-50">
      <div className="container px-4 md:px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/" className="flex items-center space-x-2">
              <span className="font-bold text-xl">TimeTrack AI</span>
            </Link>
            <nav className="hidden md:flex items-center space-x-6">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center gap-1">
                    Features <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start">
                  <DropdownMenuItem asChild>
                    <Link href="/features/time-tracking">Time Tracking</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/features/reporting">Reporting</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/features/integrations">Integrations</Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center gap-1">
                    Resources <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start">
                  <DropdownMenuItem asChild>
                    <Link href="/blog">Blog</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/help">Help Center</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/guides">Guides</Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <Link
                href="/pricing"
                className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
              >
                Pricing
              </Link>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center gap-1">
                    Company <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start">
                  <DropdownMenuItem asChild>
                    <Link href="/about">About Us</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/careers">Careers</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/contact">Contact</Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </nav>
          </div>

          <div className="flex items-center space-x-4">
            {user ? (
              <>
                <Link
                  href="/dashboard"
                  className="hidden md:inline-flex text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
                >
                  Dashboard
                </Link>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                      <Avatar className="h-8 w-8">
                        <AvatarImage
                          src={user.user_metadata?.avatar_url || "/placeholder.svg"}
                          alt={user.user_metadata?.full_name || user.email || ""}
                        />
                        <AvatarFallback>
                          {user.user_metadata?.full_name ? (
                            getInitials(user.user_metadata.full_name)
                          ) : (
                            <User className="h-4 w-4" />
                          )}
                        </AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem asChild>
                      <Link href="/dashboard">Dashboard</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/timesheet">Timesheet</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/settings">Settings</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => signOut()}>Sign out</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="hidden md:inline-flex text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
                >
                  Log in
                </Link>
                <Button asChild className="bg-blue-600 hover:bg-blue-700">
                  <Link href="/signup">Start for free</Link>
                </Button>
              </>
            )}
            <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Toggle menu">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 space-y-4">
            <div className="py-2">
              <div className="font-medium mb-1">Features</div>
              <div className="pl-4 space-y-2">
                <Link
                  href="/features/time-tracking"
                  className="block text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
                >
                  Time Tracking
                </Link>
                <Link
                  href="/features/reporting"
                  className="block text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
                >
                  Reporting
                </Link>
                <Link
                  href="/features/integrations"
                  className="block text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
                >
                  Integrations
                </Link>
              </div>
            </div>

            <div className="py-2">
              <div className="font-medium mb-1">Resources</div>
              <div className="pl-4 space-y-2">
                <Link
                  href="/blog"
                  className="block text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
                >
                  Blog
                </Link>
                <Link
                  href="/help"
                  className="block text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
                >
                  Help Center
                </Link>
                <Link
                  href="/guides"
                  className="block text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
                >
                  Guides
                </Link>
              </div>
            </div>

            <Link
              href="/pricing"
              className="block py-2 text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
            >
              Pricing
            </Link>

            <div className="py-2">
              <div className="font-medium mb-1">Company</div>
              <div className="pl-4 space-y-2">
                <Link
                  href="/about"
                  className="block text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
                >
                  About Us
                </Link>
                <Link
                  href="/careers"
                  className="block text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
                >
                  Careers
                </Link>
                <Link
                  href="/contact"
                  className="block text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
                >
                  Contact
                </Link>
              </div>
            </div>

            <div className="pt-4 border-t border-gray-200 dark:border-gray-800">
              {user ? (
                <>
                  <Link
                    href="/dashboard"
                    className="block py-2 text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
                  >
                    Dashboard
                  </Link>
                  <Link
                    href="/timesheet"
                    className="block py-2 text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
                  >
                    Timesheet
                  </Link>
                  <Link
                    href="/settings"
                    className="block py-2 text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
                  >
                    Settings
                  </Link>
                  <Button
                    onClick={() => signOut()}
                    variant="ghost"
                    className="w-full justify-start px-0 hover:bg-transparent"
                  >
                    Sign out
                  </Button>
                </>
              ) : (
                <>
                  <Link
                    href="/login"
                    className="block py-2 text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
                  >
                    Log in
                  </Link>
                  <Button asChild className="w-full mt-2 bg-blue-600 hover:bg-blue-700">
                    <Link href="/signup">Start for free</Link>
                  </Button>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
