"use client"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { logger } from "@/lib/logger"

const recentLeads = [
  {
    name: "John Doe",
    source: "MagicBricks",
    property: "Luxury Villa",
    status: "New",
    date: "2024-03-20",
  },
  // Add more dummy data...
]

export function RecentLeads() {
  logger.info("Rendering recent leads table")
  
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Source</TableHead>
          <TableHead>Property</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Date</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {recentLeads.map((lead, index) => (
          <TableRow key={index}>
            <TableCell>{lead.name}</TableCell>
            <TableCell>{lead.source}</TableCell>
            <TableCell>{lead.property}</TableCell>
            <TableCell>{lead.status}</TableCell>
            <TableCell>{lead.date}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
} 