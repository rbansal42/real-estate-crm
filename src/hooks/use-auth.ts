"use client"

import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { useSupabase } from "@/components/providers/supabase-provider"
import { logger } from "@/lib/logger"

export function useAuth() {
  const router = useRouter()
  const { user, loading, signOut } = useSupabase()

  useEffect(() => {
    logger.info("Auth state in hook", { isAuthenticated: !!user })
  }, [user])

  const checkPermission = (permission: string) => {
    if (!user) return false
    return user.user_metadata?.permissions?.includes(permission) ?? false
  }

  const checkRole = (role: string) => {
    if (!user) return false
    return user.user_metadata?.role === role
  }

  const requireAuth = () => {
    if (loading) return
    if (!user) router.push("/auth/login")
  }

  const requirePermission = (permission: string) => {
    requireAuth()
    if (!checkPermission(permission)) {
      logger.warn("Permission denied", { permission, userId: user?.id })
      router.push("/dashboard")
    }
  }

  const requireRole = (role: string) => {
    requireAuth()
    if (!checkRole(role)) {
      logger.warn("Role requirement not met", { role, userId: user?.id })
      router.push("/dashboard")
    }
  }

  return {
    user,
    loading,
    isAuthenticated: !!user,
    signOut,
    checkPermission,
    checkRole,
    requireAuth,
    requirePermission,
    requireRole,
  }
} 