"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Lead, LeadStatus } from "@/lib/types/lead"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { MoreHorizontal, Pencil, Trash2 } from "lucide-react"
import { formatCurrency } from "@/lib/utils"

interface LeadColumnsProps {
  onEdit: (lead: Lead) => void
  onDelete: (id: string) => void
}

export function getLeadColumns({
  onEdit,
  onDelete,
}: LeadColumnsProps): ColumnDef<Lead>[] {
  return [
    {
      accessorKey: "contact.name",
      header: "Name",
    },
    {
      accessorKey: "contact.email",
      header: "Email",
    },
    {
      accessorKey: "contact.phone",
      header: "Phone",
    },
    {
      accessorKey: "source",
      header: "Source",
      cell: ({ row }) => {
        const source = row.getValue("source") as string
        return <Badge variant="outline">{source}</Badge>
      },
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const status = row.getValue("status") as LeadStatus
        let variant:
          | "default"
          | "secondary"
          | "destructive"
          | "outline" = "default"

        switch (status) {
          case LeadStatus.NEW:
            variant = "default"
            break
          case LeadStatus.IN_PROGRESS:
          case LeadStatus.FOLLOW_UP:
            variant = "secondary"
            break
          case LeadStatus.QUALIFIED:
          case LeadStatus.NEGOTIATION:
            variant = "outline"
            break
          case LeadStatus.LOST:
            variant = "destructive"
            break
        }

        return <Badge variant={variant}>{status}</Badge>
      },
    },
    {
      accessorKey: "budget",
      header: "Budget",
      cell: ({ row }) => {
        const budget = row.getValue("budget") as { min: number; max: number }
        return (
          <span>
            {formatCurrency(budget.min)} - {formatCurrency(budget.max)}
          </span>
        )
      },
    },
    {
      accessorKey: "priority",
      header: "Priority",
      cell: ({ row }) => {
        const priority = row.getValue("priority") as string
        let variant:
          | "default"
          | "secondary"
          | "destructive"
          | "outline" = "default"

        switch (priority) {
          case "low":
            variant = "outline"
            break
          case "medium":
            variant = "secondary"
            break
          case "high":
            variant = "destructive"
            break
        }

        return <Badge variant={variant}>{priority}</Badge>
      },
    },
    {
      id: "actions",
      cell: ({ row }) => {
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
              <DropdownMenuItem onClick={() => onEdit(lead)}>
                <Pencil className="mr-2 h-4 w-4" />
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => onDelete(lead.id)}
                className="text-destructive"
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )
      },
    },
  ]
} 