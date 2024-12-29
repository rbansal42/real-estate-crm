"use client"

import { Skeleton } from "@/components/ui/skeleton"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"

export function LeadDetailsSkeleton() {
  return (
    <div className="h-[90vh]">
      {/* Header Skeleton */}
      <div className="px-6 py-4">
        <div className="flex items-center gap-2 mb-4">
          <Skeleton className="h-6 w-6" />
          <Skeleton className="h-8 w-[200px]" />
        </div>
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Skeleton className="h-4 w-4" />
            <Skeleton className="h-4 w-[180px]" />
          </div>
          <div className="flex items-center gap-2">
            <Skeleton className="h-4 w-4" />
            <Skeleton className="h-4 w-[150px]" />
          </div>
          <div className="flex items-center gap-2">
            <Skeleton className="h-4 w-4" />
            <Skeleton className="h-4 w-[120px]" />
          </div>
          <Skeleton className="h-6 w-[100px] rounded-full" />
        </div>
      </div>

      <ScrollArea className="flex-1 px-4">
        {/* Requirements Section */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-3">
            <Skeleton className="h-5 w-5" />
            <Skeleton className="h-6 w-[120px]" />
          </div>
          <div className="grid grid-cols-2 gap-4 bg-muted/30 p-4 rounded-lg border">
            {Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className="space-y-1">
                <div className="flex items-center gap-1">
                  <Skeleton className="h-3 w-3" />
                  <Skeleton className="h-4 w-[60px]" />
                </div>
                <Skeleton className="h-5 w-[100px]" />
              </div>
            ))}
          </div>
        </div>

        <Separator className="my-4" />

        {/* Agent Section */}
        <div className="mb-6">
          <Skeleton className="h-6 w-[140px] mb-2" />
          <div className="flex items-center gap-3">
            <Skeleton className="h-10 w-10 rounded-full" />
            <div>
              <Skeleton className="h-5 w-[120px] mb-1" />
              <Skeleton className="h-4 w-[100px]" />
            </div>
          </div>
        </div>

        <Separator className="my-4" />

        {/* Interaction History */}
        <div>
          <Skeleton className="h-6 w-[160px] mb-4" />
          <div className="space-y-4">
            {Array.from({ length: 3 }).map((_, index) => (
              <div key={index} className="bg-muted/30 p-3 rounded-lg border">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Skeleton className="h-4 w-4" />
                    <Skeleton className="h-5 w-[80px]" />
                  </div>
                  <div className="flex items-center gap-2">
                    <Skeleton className="h-4 w-4" />
                    <Skeleton className="h-4 w-[120px]" />
                  </div>
                </div>
                <Skeleton className="h-4 w-full mb-2" />
                <div className="flex items-center gap-1">
                  <Skeleton className="h-3 w-3" />
                  <Skeleton className="h-4 w-[100px]" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </ScrollArea>

      {/* Footer Skeleton */}
      <div className="border-t p-4">
        <div className="flex gap-2 mb-2">
          <Skeleton className="h-10 flex-1" />
          <Skeleton className="h-10 flex-1" />
        </div>
        <Skeleton className="h-10 w-full" />
      </div>
    </div>
  )
} 