import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Overview } from "@/components/dashboard/overview"
import { RecentLeads } from "@/components/dashboard/recent-leads"
import { LeadsBySource } from "@/components/dashboard/leads-by-source"
import { UserPlus2, Users, PhoneCall, Building2, TrendingUp, TrendingDown } from "lucide-react"
import { logger } from "@/lib/logger"

const stats = [
  {
    title: "Total Leads",
    value: "2,350",
    change: "+180",
    changeLabel: "from last month",
    trend: "up",
    icon: Users,
    color: "bg-blue-500",
    changeColor: "text-green-600",
  },
  {
    title: "New Leads",
    value: "145",
    change: "+22%",
    changeLabel: "from last week",
    trend: "up",
    icon: UserPlus2,
    color: "bg-indigo-500",
    changeColor: "text-green-600",
  },
  {
    title: "Follow-ups Due",
    value: "24",
    change: "-5",
    changeLabel: "from yesterday",
    trend: "down",
    icon: PhoneCall,
    color: "bg-amber-500",
    changeColor: "text-red-600",
  },
  {
    title: "Active Properties",
    value: "432",
    change: "+5",
    changeLabel: "new this week",
    trend: "up",
    icon: Building2,
    color: "bg-emerald-500",
    changeColor: "text-green-600",
  },
]

export default function DashboardPage() {
  logger.info("Dashboard page rendered")
  
  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
      </div>
      
      {/* Analytics Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon
          const TrendIcon = stat.trend === 'up' ? TrendingUp : TrendingDown
          
          return (
            <Card key={index} className="relative overflow-hidden">
              {/* Decorative background pattern */}
              <div 
                className="absolute right-0 top-0 h-full w-1/3 opacity-10 pointer-events-none"
                style={{
                  background: `linear-gradient(135deg, ${stat.color} 0%, transparent 100%)`
                }}
              />
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {stat.title}
                </CardTitle>
                <div className={`${stat.color} rounded-full p-2.5 text-white`}>
                  <Icon className="h-4 w-4" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className="flex items-center space-x-1">
                  <TrendIcon 
                    className={`h-3 w-3 ${stat.changeColor}`}
                  />
                  <p className={`text-xs ${stat.changeColor}`}>
                    {stat.change}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {stat.changeLabel}
                  </p>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        {/* Overview Chart */}
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Overview</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <Overview />
          </CardContent>
        </Card>

        {/* Leads by Source */}
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Leads by Source</CardTitle>
          </CardHeader>
          <CardContent>
            <LeadsBySource />
          </CardContent>
        </Card>
      </div>

      {/* Recent Leads */}
      <Card className="col-span-4">
        <CardHeader>
          <CardTitle>Recent Leads</CardTitle>
        </CardHeader>
        <CardContent>
          <RecentLeads />
        </CardContent>
      </Card>
    </div>
  )
}
