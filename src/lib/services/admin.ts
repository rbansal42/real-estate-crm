import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { AdminCreateData, AdminResponse } from "@/lib/types/auth"
import { logger } from "@/lib/logger"
import { hash } from "@/lib/utils/hash"

export async function createAdminUser(data: AdminCreateData): Promise<AdminResponse> {
  const supabase = createClientComponentClient()
  
  try {
    logger.info("Starting admin user creation", { email: data.email })

    // Hash the password
    const hashedPassword = await hash(data.password)

    // Create the user in auth.users
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
    })

    if (authError) {
      logger.error("Error creating auth user", { error: authError })
      return {
        success: false,
        error: authError.message,
      }
    }

    if (!authData.user) {
      logger.error("No user returned from auth signup")
      return {
        success: false,
        error: "Failed to create user",
      }
    }

    // Insert the user data into the users table
    const { data: userData, error: userError } = await supabase
      .from("users")
      .insert({
        id: authData.user.id,
        email: data.email,
        full_name: data.fullName,
        role: data.role,
        permissions: data.permissions,
      })
      .select()
      .single()

    if (userError) {
      logger.error("Error creating user data", { error: userError })
      // Cleanup: Delete the auth user since we couldn't create the profile
      await supabase.auth.admin.deleteUser(authData.user.id)
      return {
        success: false,
        error: userError.message,
      }
    }

    logger.info("Successfully created admin user", { userId: authData.user.id })

    return {
      success: true,
      data: {
        id: userData.id,
        email: userData.email,
        fullName: userData.full_name,
      },
    }
  } catch (error) {
    logger.error("Unexpected error creating admin user", { error })
    return {
      success: false,
      error: "An unexpected error occurred",
    }
  }
} 