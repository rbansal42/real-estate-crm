import { supabase } from "@/lib/supabase"
import { Database } from "@/types/database"
import { logger } from "@/lib/logger"

type User = Database["public"]["Tables"]["users"]["Row"]
type UserInsert = Database["public"]["Tables"]["users"]["Insert"]
type UserUpdate = Database["public"]["Tables"]["users"]["Update"]

export const userService = {
  async createUser(user: UserInsert) {
    try {
      const { data, error } = await supabase
        .from("users")
        .insert(user)
        .select()
        .single()

      if (error) throw error
      logger.info("User created", { userId: data.id })
      return data
    } catch (error) {
      logger.error("Error creating user", { error })
      throw error
    }
  },

  async updateUser(id: string, updates: UserUpdate) {
    try {
      const { data, error } = await supabase
        .from("users")
        .update(updates)
        .eq("id", id)
        .select()
        .single()

      if (error) throw error
      logger.info("User updated", { userId: id })
      return data
    } catch (error) {
      logger.error("Error updating user", { error })
      throw error
    }
  },

  async getUserById(id: string) {
    try {
      const { data, error } = await supabase
        .from("users")
        .select()
        .eq("id", id)
        .single()

      if (error) throw error
      return data
    } catch (error) {
      logger.error("Error getting user", { error })
      throw error
    }
  },

  async getUsersByTeam(teamId: string) {
    try {
      const { data, error } = await supabase
        .from("team_members")
        .select(`
          user_id,
          role,
          users:user_id (
            id,
            name,
            email,
            role,
            permissions
          )
        `)
        .eq("team_id", teamId)

      if (error) throw error
      return data
    } catch (error) {
      logger.error("Error getting team users", { error })
      throw error
    }
  },

  async searchUsers(query: string) {
    try {
      const { data, error } = await supabase
        .from("users")
        .select()
        .or(`name.ilike.%${query}%,email.ilike.%${query}%`)
        .limit(10)

      if (error) throw error
      return data
    } catch (error) {
      logger.error("Error searching users", { error })
      throw error
    }
  },

  async getUserPermissions(userId: string) {
    try {
      const { data, error } = await supabase
        .from("users")
        .select("permissions")
        .eq("id", userId)
        .single()

      if (error) throw error
      return data.permissions
    } catch (error) {
      logger.error("Error getting user permissions", { error })
      throw error
    }
  },

  async updateUserPermissions(userId: string, permissions: string[]) {
    try {
      const { data, error } = await supabase
        .from("users")
        .update({ permissions })
        .eq("id", userId)
        .select()
        .single()

      if (error) throw error
      logger.info("User permissions updated", { userId })
      return data
    } catch (error) {
      logger.error("Error updating user permissions", { error })
      throw error
    }
  }
} 