"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useAuth } from "@/components/providers/auth-provider"
import { cn } from "@/lib/utils"

export function MainNav() {
  const pathname = usePathname()
  const { checkPermission, checkRole } = useAuth()

  const isAdmin = checkRole("admin")
  const canManageTeam = checkPermission("manage_team")
  const canManageProperties = checkPermission("manage_properties")

  const items = [
    {
      title: "Dashboard",
      href: "/dashboard",
      show: true,
    },
    {
      title: "Leads",
      href: "/leads",
      show: true,
    },
    {
      title: "Properties",
      href: "/properties",
      show: canManageProperties,
    },
    {
      title: "Team",
      href: "/team",
      show: canManageTeam,
    },
    {
      title: "Admin",
      href: "/admin",
      show: isAdmin,
    },
  ]

  return (
    <nav className="flex items-center space-x-6 lg:space-x-8">
      {items
        .filter((item) => item.show)
        .map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "text-sm font-medium transition-colors hover:text-primary",
              pathname === item.href
                ? "text-foreground"
                : "text-muted-foreground"
            )}
          >
            {item.title}
          </Link>
        ))}
    </nav>
  )
} 