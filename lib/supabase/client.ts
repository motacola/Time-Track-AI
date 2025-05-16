import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import type { Database } from "../types/supabase"

// Create a single supabase client for the entire client-side application
let supabaseClient: ReturnType<typeof createClientComponentClient<Database>> | null = null

export const createClient = () => {
  if (!supabaseClient) {
    supabaseClient = createClientComponentClient<Database>()
  }
  return supabaseClient
}
