"use client"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Search, SlidersHorizontal, X } from "lucide-react"

interface LeadsTableToolbarProps<TData> {
  table: Table<TData>
}

export function LeadsTableToolbar<TData>({
  table,
}: LeadsTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <Input
          placeholder="Search leads..."
          value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("name")?.setFilterValue(event.target.value)
          }
          className="h-8 w-[150px] lg:w-[250px]"
        />
        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <Cross2Icon className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
      <div className="flex items-center space-x-2">
        <Button variant="outline" className="h-8" onClick={handleImport}>
          <Upload className="mr-2 h-4 w-4" />
          Import
        </Button>
        <Button className="h-8" onClick={handleAddNew}>
          <Plus className="mr-2 h-4 w-4" />
          Add New
        </Button>
        <DataTableViewOptions table={table} />
      </div>
    </div>
  )
}

function handleImport() {
  logger.info("Import leads clicked")
  // Implement import functionality
}

function handleAddNew() {
  logger.info("Add new lead clicked")
  // Implement add new functionality
} 