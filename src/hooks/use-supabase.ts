"use client"

import { createContext, useContext } from "react"
import type { SupabaseClient } from "@supabase/supabase-js"
import type { Database } from "@/types/database"

type SupabaseContext = {
  supabase: SupabaseClient<Database>
}

export const Context = createContext<SupabaseContext | undefined>(undefined)

export function useSupabase() {
  const context = useContext(Context)
  if (context === undefined) {
    throw new Error('useSupabase must be used inside SupabaseProvider')
  }
  return context
}
