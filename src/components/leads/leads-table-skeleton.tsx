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
      {/* Toolbar Skeleton */}
      <div className="flex items-center justify-between">
        <div className="flex flex-1 items-center space-x-2">
          <Skeleton className="h-8 w-[250px]" />
          <Skeleton className="h-8 w-[100px]" />
        </div>
        <div className="flex items-center space-x-2">
          <Skeleton className="h-8 w-[100px]" />
          <Skeleton className="h-8 w-[100px]" />
        </div>
      </div>

      {/* Table Skeleton */}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[40px]">
                <Skeleton className="h-4 w-4" />
              </TableHead>
              <TableHead><Skeleton className="h-4 w-[150px]" /></TableHead>
              <TableHead><Skeleton className="h-4 w-[200px]" /></TableHead>
              <TableHead><Skeleton className="h-4 w-[150px]" /></TableHead>
              <TableHead><Skeleton className="h-4 w-[100px]" /></TableHead>
              <TableHead><Skeleton className="h-4 w-[100px]" /></TableHead>
              <TableHead><Skeleton className="h-4 w-[150px]" /></TableHead>
              <TableHead><Skeleton className="h-4 w-[150px]" /></TableHead>
              <TableHead className="w-[40px]" />
            </TableRow>
          </TableHeader>
          <TableBody>
            {Array.from({ length: 5 }).map((_, index) => (
              <TableRow key={index}>
                <TableCell>
                  <Skeleton className="h-4 w-4" />
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Skeleton className="h-8 w-8 rounded-full" />
                    <div className="space-y-1">
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

      {/* Pagination Skeleton */}
      <div className="flex items-center justify-between">
        <Skeleton className="h-8 w-[200px]" />
        <div className="flex items-center space-x-2">
          <Skeleton className="h-8 w-[100px]" />
          <div className="flex items-center space-x-1">
            {Array.from({ length: 4 }).map((_, index) => (
              <Skeleton key={index} className="h-8 w-8" />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
} 