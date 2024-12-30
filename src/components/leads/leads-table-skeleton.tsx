"use client"

import { Skeleton } from "@/components/ui/skeleton"

export function LeadsTableSkeleton() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Skeleton className="h-8 w-[250px]" />
        <div className="flex items-center space-x-2">
          <Skeleton className="h-8 w-[100px]" />
          <Skeleton className="h-8 w-[70px]" />
        </div>
      </div>
      <div className="rounded-md border">
        <div className="h-12 border-b px-4">
          <div className="flex items-center space-x-4">
            <Skeleton className="h-4 w-[20%]" />
            <Skeleton className="h-4 w-[20%]" />
            <Skeleton className="h-4 w-[20%]" />
            <Skeleton className="h-4 w-[20%]" />
            <Skeleton className="h-4 w-[20%]" />
          </div>
        </div>
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="h-12 border-b px-4">
            <div className="flex items-center space-x-4">
              <Skeleton className="h-4 w-[20%]" />
              <Skeleton className="h-4 w-[20%]" />
              <Skeleton className="h-4 w-[20%]" />
              <Skeleton className="h-4 w-[20%]" />
              <Skeleton className="h-4 w-[20%]" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
} 