import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs"
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { logger } from "./lib/logger"
import { nanoid } from "nanoid"

export async function middleware(req: NextRequest) {
  // Generate a unique request ID
  const requestId = nanoid()

  // Log the incoming request
  logger.info("Incoming request", {
    requestId,
    method: req.method,
    path: req.nextUrl.pathname,
    query: Object.fromEntries(req.nextUrl.searchParams.entries()),
    userAgent: req.headers.get("user-agent"),
  })

  const res = NextResponse.next()
  const supabase = createMiddlewareClient({ req, res })

  const {
    data: { session },
  } = await supabase.auth.getSession()

  // Check if the user is authenticated
  if (!session) {
    const url = new URL(req.url)
    // If the user is not authenticated and trying to access a protected route
    if (
      !url.pathname.startsWith("/login") &&
      !url.pathname.startsWith("/signup") &&
      !url.pathname.startsWith("/forgot-password") &&
      !url.pathname === "/"
    ) {
      return NextResponse.redirect(new URL("/login", req.url))
    }
  }

  // If the user is authenticated and trying to access auth pages
  if (session) {
    const url = new URL(req.url)
    if (
      url.pathname.startsWith("/login") ||
      url.pathname.startsWith("/signup") ||
      url.pathname.startsWith("/forgot-password")
    ) {
      return NextResponse.redirect(new URL("/dashboard", req.url))
    }
  }

  // Add the request ID to the response headers for correlation
  res.headers.set("x-request-id", requestId)

  return res
}

export const config = {
  matcher: [
    // Match all API routes
    "/api/:path*",
    // Match all page routes except static assets
    "/((?!_next/static|_next/image|favicon.ico).*)",
    "/dashboard/:path*",
    "/timesheet/:path*",
    "/settings/:path*",
    "/login",
    "/signup",
    "/forgot-password",
  ],
}
