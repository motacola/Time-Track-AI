import { createServerClient as createSSRClient } from "@supabase/ssr"
import type { Database } from "../types/supabase"
import { cookies } from "next/headers"

export const createClient = async () => {
  const cookieStore = await cookies()
  const supabaseUrl = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL || "https://example.supabase.co"
  const supabaseKey = process.env.SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "your-anon-key"

  return createSSRClient<Database>(supabaseUrl, supabaseKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll()
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) => cookieStore.set(name, value, options))
        } catch {
          // Server Component context — ignore
        }
      },
    },
  })
}

export const createServerClient = () => {
  const supabaseUrl = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL || "https://example.supabase.co"
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || "your-service-role-key"
  // Service-role client has no cookie context
  const { createClient: createPlain } = require("@supabase/supabase-js")
  return createPlain(supabaseUrl, supabaseKey)
}
