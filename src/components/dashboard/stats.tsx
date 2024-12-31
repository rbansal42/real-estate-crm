"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Users, Building2, TrendingUp, TrendingDown } from "lucide-react"
import { cn } from "@/lib/utils"

interface DashboardStatsProps {
  stats: {
    totalLeads: number
    activeProperties: number
    conversionRate: number
    changeFromLastMonth: {
      leads: number
      properties: number
      conversion: number
    }
  }
  isLoading?: boolean
}

export function DashboardStats({ stats, isLoading }: DashboardStatsProps) {
  const items = [
    {
      title: "Total Leads",
      value: stats.totalLeads.toLocaleString(),
      icon: Users,
      change: stats.changeFromLastMonth.leads,
      changeLabel: "from last month",
      changePrefix: stats.changeFromLastMonth.leads >= 0 ? "+" : "",
    },
    {
      title: "Active Properties",
      value: stats.activeProperties.toLocaleString(),
      icon: Building2,
      change: stats.changeFromLastMonth.properties,
      changeLabel: "from last month",
      changePrefix: stats.changeFromLastMonth.properties >= 0 ? "+" : "",
    },
    {
      title: "Conversion Rate",
      value: `${stats.conversionRate.toFixed(1)}%`,
      icon: TrendingUp,
      change: stats.changeFromLastMonth.conversion,
      changeLabel: "from last month",
      changePrefix: stats.changeFromLastMonth.conversion >= 0 ? "+" : "",
      changeSuffix: "%",
    },
  ]

  if (isLoading) {
    return (
      <div className="grid gap-4 md:grid-cols-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <Card key={i}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                <Skeleton className="h-4 w-[100px]" />
              </CardTitle>
              <Skeleton className="h-4 w-4 rounded" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-7 w-[100px]" />
              <div className="mt-2 flex items-center space-x-1">
                <Skeleton className="h-4 w-[60px]" />
                <Skeleton className="h-4 w-[100px]" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  return (
    <div className="grid gap-4 md:grid-cols-3">
      {items.map((item) => {
        const Icon = item.icon
        const isPositive = item.change >= 0
        const TrendIcon = isPositive ? TrendingUp : TrendingDown

        return (
          <Card key={item.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{item.title}</CardTitle>
              <Icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{item.value}</div>
              <div className="mt-2 flex items-center space-x-1">
                <TrendIcon
                  className={cn(
                    "h-3 w-3",
                    isPositive ? "text-emerald-500" : "text-red-500"
                  )}
                />
                <p
                  className={cn(
                    "text-xs",
                    isPositive ? "text-emerald-500" : "text-red-500"
                  )}
                >
                  {item.changePrefix}
                  {Math.abs(item.change)}
                  {item.changeSuffix}
                </p>
                <p className="text-xs text-muted-foreground">
                  {item.changeLabel}
                </p>
              </div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
} 