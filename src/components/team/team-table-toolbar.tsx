"use client"

import { Table } from "@tanstack/react-table"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, X, UserPlus } from "lucide-react"
import { DataTableViewOptions } from "@/components/ui/data-table-view-options"
import { TeamMember } from "@/lib/types/team"
import { logger } from "@/lib/logger"

interface TeamTableToolbarProps {
  table: Table<TeamMember>
  onAdd?: () => void
}

export function TeamTableToolbar({ table, onAdd }: TeamTableToolbarProps) {
  const handleSearch = (term: string) => {
    logger.info("Searching team members", { term })
    table.getColumn("name")?.setFilterValue(term)
  }

  const handleResetFilters = () => {
    logger.info("Resetting team filters")
    table.resetColumnFilters()
  }

  const handleAdd = () => {
    if (onAdd) {
      logger.info("Opening add team member dialog")
      onAdd()
    }
  }

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <div className="relative w-72">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search team members..."
            value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
            onChange={(event) => handleSearch(event.target.value)}
            className="pl-8"
          />
        </div>
        {table.getState().columnFilters.length > 0 && (
          <Button
            variant="ghost"
            onClick={handleResetFilters}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <X className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
      <div className="flex items-center space-x-2">
        {onAdd && (
          <Button
            variant="default"
            size="sm"
            className="h-8"
            onClick={handleAdd}
          >
            <UserPlus className="mr-2 h-4 w-4" />
            Add Member
          </Button>
        )}
        <DataTableViewOptions table={table} />
      </div>
    </div>
  )
} 