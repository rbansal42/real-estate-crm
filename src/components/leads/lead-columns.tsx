"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Lead, LeadStatus } from "@/lib/types/lead"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { MoreHorizontal, Eye, Edit, Trash } from "lucide-react"
import { DataTableColumnHeader } from "@/components/ui/data-table-column-header"

const getStatusColor = (status: LeadStatus) => {
  switch (status) {
    case LeadStatus.NEW:
      return "bg-blue-500"
    case LeadStatus.CONTACTED:
      return "bg-yellow-500"
    case LeadStatus.QUALIFIED:
      return "bg-green-500"
    case LeadStatus.PROPOSAL:
      return "bg-purple-500"
    case LeadStatus.NEGOTIATION:
      return "bg-orange-500"
    case LeadStatus.WON:
      return "bg-emerald-500"
    case LeadStatus.LOST:
      return "bg-red-500"
    case LeadStatus.INACTIVE:
      return "bg-gray-500"
    default:
      return "bg-gray-500"
  }
}

export const columns: ColumnDef<Lead>[] = [
  {
    accessorKey: "contact.name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
  },
  {
    accessorKey: "contact.email",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Email" />
    ),
  },
  {
    accessorKey: "contact.phone",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Phone" />
    ),
  },
  {
    accessorKey: "source",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Source" />
    ),
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => {
      const status = row.getValue("status") as LeadStatus
      return (
        <Badge className={`${getStatusColor(status)} text-white`}>
          {status}
        </Badge>
      )
    },
  },
  {
    accessorKey: "budget",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Budget" />
    ),
  },
  {
    id: "actions",
    cell: ({ row, table }) => {
      const lead = row.original

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => table.options.meta?.onView(lead)}
            >
              <Eye className="mr-2 h-4 w-4" />
              View
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => table.options.meta?.onEdit(lead)}
            >
              <Edit className="mr-2 h-4 w-4" />
              Edit
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="text-red-600"
              onClick={() => table.options.meta?.onDelete(lead)}
            >
              <Trash className="mr-2 h-4 w-4" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
] 