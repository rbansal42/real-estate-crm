"use client"

import { LeadsDataTable } from "@/components/leads/leads-data-table"
import { logger } from "@/lib/logger"

export default function LeadsPage() {
  logger.info("Rendering leads page")

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Leads Management</h2>
      </div>
      <div className="space-y-4">
        <LeadsDataTable />
      </div>
    </div>
  )
} 