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

export function PropertyTableSkeleton() {
  return (
    <div className="space-y-4">
      {/* Toolbar Skeleton */}
      <div className="flex items-center justify-between">
        <div className="flex flex-1 items-center space-x-2">
          <Skeleton className="h-8 w-[250px]" /> {/* Search input */}
          <Skeleton className="h-8 w-[100px]" /> {/* Filter button */}
        </div>
        <div className="flex items-center space-x-2">
          <Skeleton className="h-8 w-[100px]" /> {/* Add Property button */}
          <Skeleton className="h-8 w-[100px]" /> {/* View options */}
        </div>
      </div>

      {/* Table Skeleton */}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[40px]">
                <Skeleton className="h-4 w-4" /> {/* Checkbox */}
              </TableHead>
              <TableHead className="w-[300px]"><Skeleton className="h-4 w-[250px]" /></TableHead>
              <TableHead className="w-[100px]"><Skeleton className="h-4 w-[80px]" /></TableHead>
              <TableHead className="w-[100px]"><Skeleton className="h-4 w-[80px]" /></TableHead>
              <TableHead className="w-[150px]"><Skeleton className="h-4 w-[120px]" /></TableHead>
              <TableHead className="w-[150px]"><Skeleton className="h-4 w-[120px]" /></TableHead>
              <TableHead className="w-[120px]"><Skeleton className="h-4 w-[100px]" /></TableHead>
              <TableHead className="w-[50px]" /> {/* Actions column */}
            </TableRow>
          </TableHeader>
          <TableBody>
            {Array.from({ length: 5 }).map((_, index) => (
              <TableRow key={index}>
                <TableCell>
                  <Skeleton className="h-4 w-4" /> {/* Checkbox */}
                </TableCell>
                <TableCell>
                  <div className="flex flex-col space-y-1">
                    <Skeleton className="h-4 w-[250px]" /> {/* Title */}
                    <Skeleton className="h-3 w-[200px]" /> {/* Address */}
                  </div>
                </TableCell>
                <TableCell>
                  <Skeleton className="h-6 w-[60px] rounded-full" /> {/* Type badge */}
                </TableCell>
                <TableCell>
                  <Skeleton className="h-6 w-[60px] rounded-full" /> {/* Status badge */}
                </TableCell>
                <TableCell>
                  <div className="flex flex-col space-y-1">
                    <Skeleton className="h-4 w-[100px]" /> {/* Price */}
                    <Skeleton className="h-3 w-[80px]" /> {/* Price per sq.ft */}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex flex-col space-y-1">
                    <Skeleton className="h-4 w-[80px]" /> {/* BHK */}
                    <Skeleton className="h-3 w-[60px]" /> {/* Area */}
                  </div>
                </TableCell>
                <TableCell>
                  <Skeleton className="h-4 w-[80px]" /> {/* Listed date */}
                </TableCell>
                <TableCell>
                  <Skeleton className="h-8 w-8" /> {/* Action button */}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Pagination Skeleton */}
      <div className="flex items-center justify-between">
        <Skeleton className="h-8 w-[200px]" /> {/* Items per page */}
        <Skeleton className="h-8 w-[300px]" /> {/* Pagination controls */}
      </div>
    </div>
  )
} 