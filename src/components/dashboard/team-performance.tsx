'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { logger } from "@/lib/logger"
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts"

interface TeamMember {
  id: string
  name: string
  leadsAssigned: number
  leadsConverted: number
  conversionRate: number
}

interface TeamPerformanceProps {
  teamMembers?: TeamMember[]
  isLoading?: boolean
}

export function TeamPerformance({ teamMembers, isLoading }: TeamPerformanceProps) {
  logger.info("Rendering team performance chart", { memberCount: teamMembers?.length })

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Team Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <Skeleton className="h-[350px] w-full" />
        </CardContent>
      </Card>
    )
  }

  const chartData = teamMembers?.map((member) => ({
    name: member.name,
    "Leads Assigned": member.leadsAssigned,
    "Leads Converted": member.leadsConverted,
    "Conversion Rate": member.conversionRate,
  }))

  return (
    <Card>
      <CardHeader>
        <CardTitle>Team Performance</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={chartData}>
            <XAxis
              dataKey="name"
              stroke="#888888"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              stroke="#888888"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `${value}`}
            />
            <Tooltip />
            <Bar
              dataKey="Leads Assigned"
              fill="hsl(var(--primary))"
              radius={[4, 4, 0, 0]}
            />
            <Bar
              dataKey="Leads Converted"
              fill="hsl(var(--secondary))"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
} 