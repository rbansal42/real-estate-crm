"use client"

import { LeadsDataTable } from "@/components/leads/leads-data-table"
import { LeadsTableToolbar } from "@/components/leads/leads-table-toolbar"
import { logger } from "@/lib/logger"
import { useState } from "react"
import { useLeadsData } from "@/hooks/use-leads-data"

export default function LeadsPage() {
  logger.info("Rendering leads page")
  const { data: leads, isLoading } = useLeadsData()

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Leads Management</h2>
      </div>
      <div className="space-y-4">
        <LeadsDataTable />
      </div>
    </div>
  )
} 