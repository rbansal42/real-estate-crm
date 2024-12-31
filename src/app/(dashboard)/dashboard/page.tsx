"use client"

import { useEffect, useState } from "react"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { DashboardShell } from "@/components/dashboard/dashboard-shell"
import { DashboardStats } from "@/components/dashboard/stats"
import { RecentLeads } from "@/components/dashboard/recent-leads"
import { TeamPerformance } from "@/components/dashboard/team-performance"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { logger } from "@/lib/logger"

interface DashboardData {
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
  leads: any[]
  teamMembers: any[]
}

export default function DashboardPage() {
  const [data, setData] = useState<DashboardData>({
    stats: {
      totalLeads: 0,
      activeProperties: 0,
      conversionRate: 0,
      changeFromLastMonth: {
        leads: 0,
        properties: 0,
        conversion: 0,
      },
    },
    leads: [],
    teamMembers: [],
  })
  const [loading, setLoading] = useState(true)
  const supabase = createClientComponentClient()

  useEffect(() => {
    async function loadDashboardData() {
      try {
        setLoading(true)
        logger.info("Loading dashboard data")

        // Fetch dashboard stats
        const { data: statsData, error: statsError } = await supabase
          .from("dashboard_stats")
          .select("*")
          .single()

        if (statsError) throw statsError

        // Fetch recent leads
        const { data: leadsData, error: leadsError } = await supabase
          .from("leads")
          .select("*")
          .order("created_at", { ascending: false })
          .limit(5)

        if (leadsError) throw leadsError

        // Fetch team performance
        const { data: teamData, error: teamError } = await supabase
          .from("team_performance")
          .select("*")

        if (teamError) throw teamError

        setData({
          stats: statsData,
          leads: leadsData,
          teamMembers: teamData,
        })
        logger.info("Dashboard data loaded successfully")
      } catch (error) {
        logger.error("Error loading dashboard data", { error })
      } finally {
        setLoading(false)
      }
    }

    loadDashboardData()
  }, [supabase])

  return (
    <DashboardShell>
      <DashboardHeader
        heading="Dashboard"
        text="Overview of your real estate business"
      />

      <DashboardStats stats={data.stats} isLoading={loading} />

      {/* Recent Leads */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Leads</CardTitle>
        </CardHeader>
        <CardContent>
          <RecentLeads leads={data.leads} isLoading={loading} />
        </CardContent>
      </Card>

      {/* Team Performance */}
      <TeamPerformance teamMembers={data.teamMembers} isLoading={loading} />
    </DashboardShell>
  )
} 