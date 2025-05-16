import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import type { Database } from "../types/supabase"
import { logger } from "@/lib/logger"

export function createClient(cookieStore = cookies()) {
  try {
    return createServerComponentClient<Database>({ cookies: () => cookieStore })
  } catch (error) {
    logger.error("Error creating Supabase client:", error instanceof Error ? error : new Error(String(error)))
    // Return a minimal client that won't crash but will return errors
    // This allows the application to gracefully handle the error
    return {
      auth: {
        getSession: async () => ({ data: { session: null }, error }),
        signOut: async () => ({ error }),
      },
      from: () => ({
        select: () => ({
          eq: () => ({
            order: () => ({
              limit: () => ({ data: null, error }),
            }),
          }),
        }),
      }),
    } as any
  }
}
