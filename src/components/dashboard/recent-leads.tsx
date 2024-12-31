"use client"

import { useState } from "react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { MoreHorizontal, Phone, Mail } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { logger } from "@/lib/logger"

interface Lead {
  id: string
  name: string
  email: string
  phone: string
  source: string
  status: "new" | "contacted" | "qualified" | "lost"
  createdAt: string
}

interface RecentLeadsProps {
  leads?: Lead[]
  isLoading?: boolean
}

export function RecentLeads({ leads, isLoading }: RecentLeadsProps) {
  const [selectedLeads, setSelectedLeads] = useState<string[]>([])

  const handleLeadAction = (leadId: string, action: string) => {
    logger.info("Lead action triggered", { leadId, action })
    // Handle lead action
  }

  const getStatusVariant = (status: Lead["status"]) => {
    switch (status) {
      case "new":
        return "default"
      case "contacted":
        return "secondary"
      case "qualified":
        return "outline"
      case "lost":
        return "destructive"
      default:
        return "default"
    }
  }

  if (isLoading) {
    return (
      <div className="w-full space-y-4">
        <div className="grid gap-6">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="flex items-center space-x-4">
              <Skeleton className="h-12 w-12 rounded-full" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-[250px]" />
                <Skeleton className="h-4 w-[200px]" />
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Contact</TableHead>
          <TableHead>Source</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Date</TableHead>
          <TableHead className="w-[70px]"></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {leads?.map((lead) => (
          <TableRow key={lead.id}>
            <TableCell>{lead.name}</TableCell>
            <TableCell>
              <div className="flex items-center space-x-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleLeadAction(lead.id, "call")}
                >
                  <Phone className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleLeadAction(lead.id, "email")}
                >
                  <Mail className="h-4 w-4" />
                </Button>
              </div>
            </TableCell>
            <TableCell>{lead.source}</TableCell>
            <TableCell>
              <Badge variant={getStatusVariant(lead.status)}>
                {lead.status}
              </Badge>
            </TableCell>
            <TableCell>{new Date(lead.createdAt).toLocaleDateString()}</TableCell>
            <TableCell>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <MoreHorizontal className="h-4 w-4" />
                    <span className="sr-only">Open menu</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem
                    onClick={() => handleLeadAction(lead.id, "view")}
                  >
                    View Details
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => handleLeadAction(lead.id, "edit")}
                  >
                    Edit Lead
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => handleLeadAction(lead.id, "delete")}
                    className="text-destructive"
                  >
                    Delete Lead
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
} 