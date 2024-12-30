"use client"

import { Table } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Plus } from "lucide-react"
import { DataTableViewOptions } from "@/components/ui/data-table-view-options"

interface LeadsTableToolbarProps<TData> {
  table: Table<TData>
  onAdd: () => void
}

export function LeadsTableToolbar<TData>({
  table,
  onAdd,
}: LeadsTableToolbarProps<TData>) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <Input
          placeholder="Filter leads..."
          value={(table.getColumn("contact.name")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("contact.name")?.setFilterValue(event.target.value)
          }
          className="h-8 w-[150px] lg:w-[250px]"
        />
      </div>
      <div className="flex items-center space-x-2">
        <Button
          variant="outline"
          size="sm"
          className="h-8"
          onClick={onAdd}
        >
          <Plus className="mr-2 h-4 w-4" />
          Add Lead
        </Button>
        <DataTableViewOptions table={table} />
      </div>
    </div>
  )
} 