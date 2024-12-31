'use client';

import { useQuery } from "@tanstack/react-query"
import { Lead } from "@/lib/types/lead"
import { supabase } from "@/lib/supabase"
import { logger } from "@/lib/logger"

export function useLeadsData() {
  return useQuery<Lead[]>({
    queryKey: ["leads"],
    queryFn: async () => {
      try {
        const { data, error } = await supabase
          .from("leads")
          .select("*")
          .order("created_at", { ascending: false })

        if (error) {
          logger.error("Error fetching leads", { error })
          throw error
        }

        logger.info("Leads fetched successfully", { count: data?.length })
        return data || []
      } catch (error) {
        logger.error("Error in useLeadsData hook", { error })
        throw error
      }
    },
  })
} 