"use client"

import { createContext, useContext, useEffect, useState } from "react"
import { User } from "@supabase/supabase-js"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabase"
import { logger } from "@/lib/logger"

type AuthContextType = {
  user: User | null
  loading: boolean
  isAuthenticated: boolean
  signOut: () => Promise<void>
  signInWithEmail: (email: string, password: string) => Promise<void>
  signUpWithEmail: (email: string, password: string) => Promise<void>
  resetPassword: (email: string) => Promise<void>
  checkPermission: (permission: string) => boolean
  checkRole: (role: string) => boolean
  requireAuth: () => void
  requirePermission: (permission: string) => void
  requireRole: (role: string) => void
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  isAuthenticated: false,
  signOut: async () => {},
  signInWithEmail: async () => {},
  signUpWithEmail: async () => {},
  resetPassword: async () => {},
  checkPermission: () => false,
  checkRole: () => false,
  requireAuth: () => {},
  requirePermission: () => {},
  requireRole: () => {},
})

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    // Check active sessions and sets the user
    supabase.auth.getSession().then(({ data: { session } }) => {
      logger.info("Session check", { userId: session?.user?.id })
      setUser(session?.user ?? null)
      setLoading(false)
    })

    // Listen for changes on auth state (logged in, signed out, etc.)
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      logger.info("Auth state changed", { event: _event, userId: session?.user?.id })
      setUser(session?.user ?? null)
      setLoading(false)
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [])

  const signOut = async () => {
    try {
      await supabase.auth.signOut()
      logger.info("User signed out")
    } catch (error) {
      logger.error("Error signing out", { error })
      throw error
    }
  }

  const signInWithEmail = async (email: string, password: string) => {
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })
      if (error) throw error
      logger.info("User signed in", { email })
    } catch (error) {
      logger.error("Error signing in", { error })
      throw error
    }
  }

  const signUpWithEmail = async (email: string, password: string) => {
    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`,
        },
      })
      if (error) throw error
      logger.info("User signed up", { email })
    } catch (error) {
      logger.error("Error signing up", { error })
      throw error
    }
  }

  const resetPassword = async (email: string) => {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth/reset-password`,
      })
      if (error) throw error
      logger.info("Password reset email sent", { email })
    } catch (error) {
      logger.error("Error sending password reset email", { error })
      throw error
    }
  }

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

  const value = {
    user,
    loading,
    isAuthenticated: !!user,
    signOut,
    signInWithEmail,
    signUpWithEmail,
    resetPassword,
    checkPermission,
    checkRole,
    requireAuth,
    requirePermission,
    requireRole,
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
} 