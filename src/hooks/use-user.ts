"use client"

import { useCallback, useEffect, useState } from "react"
import { useSupabase } from "@/components/providers/supabase-provider"
import { userService } from "@/services/user-service"
import { Database } from "@/types/database"
import { logger } from "@/lib/logger"

type User = Database["public"]["Tables"]["users"]["Row"]

export function useUser() {
  const { user: authUser } = useSupabase()
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  const fetchUser = useCallback(async () => {
    if (!authUser?.id) {
      setUser(null)
      setLoading(false)
      return
    }

    try {
      const userData = await userService.getUserById(authUser.id)
      setUser(userData)
    } catch (error) {
      logger.error("Error fetching user data", { error })
    } finally {
      setLoading(false)
    }
  }, [authUser?.id])

  useEffect(() => {
    fetchUser()
  }, [fetchUser])

  const updateProfile = async (updates: Partial<User>) => {
    if (!user?.id) return

    try {
      const updatedUser = await userService.updateUser(user.id, updates)
      setUser(updatedUser)
      logger.info("Profile updated", { userId: user.id })
      return updatedUser
    } catch (error) {
      logger.error("Error updating profile", { error })
      throw error
    }
  }

  const checkPermission = (permission: string) => {
    if (!user?.permissions) return false
    return user.permissions.includes(permission)
  }

  const checkRole = (role: string) => {
    if (!user?.role) return false
    return user.role === role
  }

  return {
    user,
    loading,
    updateProfile,
    checkPermission,
    checkRole,
    refetch: fetchUser,
  }
} 