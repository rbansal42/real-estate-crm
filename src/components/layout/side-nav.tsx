"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useAuth } from "@/components/providers/auth-provider"
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import {
  LayoutDashboard,
  Users,
  Building2,
  UserPlus,
  Settings,
  ShieldCheck,
} from "lucide-react"

export function SideNav() {
  const pathname = usePathname()
  const { checkPermission, checkRole } = useAuth()

  const isAdmin = checkRole("admin")
  const canManageTeam = checkPermission("manage_team")
  const canManageProperties = checkPermission("manage_properties")
  const canImportLeads = checkPermission("import_leads")

  const items = [
    {
      title: "Dashboard",
      href: "/dashboard",
      icon: LayoutDashboard,
      show: true,
    },
    {
      title: "Leads",
      href: "/leads",
      icon: UserPlus,
      show: true,
    },
    {
      title: "Import Leads",
      href: "/leads/import",
      icon: UserPlus,
      show: canImportLeads,
    },
    {
      title: "Properties",
      href: "/properties",
      icon: Building2,
      show: canManageProperties,
    },
    {
      title: "Team",
      href: "/team",
      icon: Users,
      show: canManageTeam,
    },
    {
      title: "Settings",
      href: "/settings",
      icon: Settings,
      show: true,
    },
    {
      title: "Admin",
      href: "/admin",
      icon: ShieldCheck,
      show: isAdmin,
    },
  ]

  return (
    <nav className="grid items-start gap-2 p-4">
      {items
        .filter((item) => item.show)
        .map((item) => {
          const Icon = item.icon
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                buttonVariants({ variant: "ghost" }),
                pathname === item.href
                  ? "bg-muted hover:bg-muted"
                  : "hover:bg-transparent hover:underline",
                "justify-start"
              )}
            >
              <Icon className="mr-2 h-4 w-4" />
              {item.title}
            </Link>
          )
        })}
    </nav>
  )
} 