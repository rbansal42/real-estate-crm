"use client"

import { LeadsDataTable } from "@/components/leads/leads-data-table"
import { LeadsTableSkeleton } from "@/components/leads/leads-table-skeleton"
import { logger } from "@/lib/logger"
import { useLeadsData } from "@/hooks/use-leads-data"

export default function LeadsPage() {
  const { data: leads, isLoading } = useLeadsData()
  
  logger.info("Rendering leads page")

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Leads Management</h2>
      </div>
      <div className="space-y-4">
        {isLoading ? <LeadsTableSkeleton /> : <LeadsDataTable />}
      </div>
    </div>
  )
} 