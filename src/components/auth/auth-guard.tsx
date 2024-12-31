"use client"

import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { logger } from "@/lib/logger"

interface AuthGuardProps {
  children: React.ReactNode
  allowedRoles?: string[]
  requiredPermissions?: string[]
}

export function AuthGuard({
  children,
  allowedRoles = [],
  requiredPermissions = [],
}: AuthGuardProps) {
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === "loading") return

    if (!session) {
      logger.warn("Unauthorized access attempt - No session")
      router.push("/auth/login")
      return
    }

    if (allowedRoles.length > 0 && !allowedRoles.includes(session.user.role)) {
      logger.warn("Unauthorized access attempt - Invalid role", {
        userRole: session.user.role,
        allowedRoles,
      })
      router.push("/dashboard")
      return
    }

    if (requiredPermissions.length > 0) {
      const userPermissions = session.user.permissions || []
      const hasAllPermissions = requiredPermissions.every((permission) =>
        userPermissions.includes(permission)
      )

      if (!hasAllPermissions) {
        logger.warn("Unauthorized access attempt - Missing permissions", {
          userPermissions,
          requiredPermissions,
        })
        router.push("/dashboard")
        return
      }
    }
  }, [status, session, router, allowedRoles, requiredPermissions])

  if (status === "loading") {
    return <div>Loading...</div>
  }

  return <>{children}</>
} 