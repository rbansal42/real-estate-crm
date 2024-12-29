"use client"

import { useState } from "react"
import { TeamDataTable } from "@/components/team/team-data-table"
import { TeamTableToolbar } from "@/components/team/team-table-toolbar"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { CreateTeamMemberDialog } from "@/components/team/create-team-member-dialog"
import { logger } from "@/lib/logger"
import { useTeamData } from "@/hooks/use-team-data"
import { useReactTable, getCoreRowModel } from "@tanstack/react-table"

export default function TeamPage() {
  const [createDialogOpen, setCreateDialogOpen] = useState(false)
  const { data: teamData, isLoading } = useTeamData()
  
  const table = useReactTable({
    data: teamData || [],
    columns: [], // Define your columns here
    getCoreRowModel: getCoreRowModel(),
  })
  
  logger.info("Rendering team page")

  if (isLoading) {
    return <div className="flex-1 p-8">Loading...</div>
  }

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Team Management</h2>
        <Button onClick={() => setCreateDialogOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Add Team Member
        </Button>
      </div>
      <div className="space-y-4">
        <TeamTableToolbar table={table} />
        <TeamDataTable />
      </div>
      <CreateTeamMemberDialog
        open={createDialogOpen}
        onOpenChange={setCreateDialogOpen}
      />
    </div>
  )
} 