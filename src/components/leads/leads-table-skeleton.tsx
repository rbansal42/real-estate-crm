"use client"

import { Skeleton } from "@/components/ui/skeleton"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

export function LeadsTableSkeleton() {
  return (
    <div className="space-y-4">
      {/* Toolbar Skeleton - Matches LeadsTableToolbar height */}
      <div className="flex items-center justify-between h-10">
        <div className="flex flex-1 items-center space-x-2">
          <Skeleton className="h-9 w-[280px]" /> {/* Search input */}
          <Skeleton className="h-9 w-[120px]" /> {/* Filter button */}
        </div>
        <div className="flex items-center space-x-2">
          <Skeleton className="h-9 w-[120px]" /> {/* View columns */}
          <Skeleton className="h-9 w-[120px]" /> {/* Reset filters */}
        </div>
      </div>

      {/* Table Skeleton - Matches LeadsDataTable dimensions */}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[40px]">
                <Skeleton className="h-4 w-4" /> {/* Checkbox */}
              </TableHead>
              <TableHead className="w-[200px]"><Skeleton className="h-4 w-[120px]" /></TableHead>
              <TableHead className="w-[250px]"><Skeleton className="h-4 w-[180px]" /></TableHead>
              <TableHead className="w-[150px]"><Skeleton className="h-4 w-[100px]" /></TableHead>
              <TableHead className="w-[120px]"><Skeleton className="h-4 w-[80px]" /></TableHead>
              <TableHead className="w-[130px]"><Skeleton className="h-4 w-[100px]" /></TableHead>
              <TableHead className="w-[180px]"><Skeleton className="h-4 w-[120px]" /></TableHead>
              <TableHead className="w-[150px]"><Skeleton className="h-4 w-[120px]" /></TableHead>
              <TableHead className="w-[50px]" /> {/* Actions column */}
            </TableRow>
          </TableHeader>
          <TableBody>
            {Array.from({ length: 10 }).map((_, index) => (
              <TableRow key={index} className="h-[52px]">
                <TableCell>
                  <Skeleton className="h-4 w-4" />
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Skeleton className="h-8 w-8 rounded-full" />
                    <div className="space-y-1.5">
                      <Skeleton className="h-4 w-[120px]" />
                      <Skeleton className="h-3 w-[150px]" />
                    </div>
                  </div>
                </TableCell>
                <TableCell><Skeleton className="h-4 w-[180px]" /></TableCell>
                <TableCell><Skeleton className="h-4 w-[120px]" /></TableCell>
                <TableCell><Skeleton className="h-4 w-[80px]" /></TableCell>
                <TableCell>
                  <Skeleton className="h-6 w-[100px] rounded-full" />
                </TableCell>
                <TableCell><Skeleton className="h-4 w-[120px]" /></TableCell>
                <TableCell><Skeleton className="h-4 w-[120px]" /></TableCell>
                <TableCell>
                  <Skeleton className="h-8 w-8 rounded-md" />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Pagination Skeleton - Matches DataTablePagination height */}
      <div className="flex items-center justify-between h-[52px]">
        <Skeleton className="h-8 w-[200px]" /> {/* Items per page */}
        <div className="flex items-center space-x-6">
          <Skeleton className="h-8 w-[100px]" /> {/* Page info */}
          <div className="flex items-center space-x-2">
            {Array.from({ length: 4 }).map((_, index) => (
              <Skeleton key={index} className="h-8 w-8" />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
} 