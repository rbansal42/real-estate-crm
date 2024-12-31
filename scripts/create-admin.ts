#!/usr/bin/env ts-node

import { createClient } from "@supabase/supabase-js"
import { AdminCreateSchema } from "@/lib/validations/auth"
import { logger } from "@/lib/logger"
import { hash } from "@/lib/utils/hash"
import yargs from "yargs"
import { hideBin } from "yargs/helpers"
import * as dotenv from "dotenv"
import { resolve } from "path"

// Load environment variables from project root
const envPath = resolve(__dirname, "../.env")
console.log("Loading environment from:", envPath)
dotenv.config({ path: envPath })

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!SUPABASE_URL || !SUPABASE_SERVICE_KEY) {
  console.error("Missing required environment variables:")
  console.error("NEXT_PUBLIC_SUPABASE_URL:", SUPABASE_URL ? "✓" : "✗")
  console.error("SUPABASE_SERVICE_ROLE_KEY:", SUPABASE_SERVICE_KEY ? "✓" : "✗")
  process.exit(1)
}

console.log("Initializing Supabase client...")
const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
  db: {
    schema: 'public'
  }
})

async function verifyUsersTable() {
  console.log("Verifying users table exists...")
  const { data, error } = await supabase
    .from("users")
    .select("*")
    .limit(1)

  if (error) {
    console.error("Error verifying users table. Full error:", JSON.stringify(error, null, 2))
    return false
  }

  console.log("Users table exists and is accessible")
  return true
}

async function createAdmin(email: string, fullName: string, password: string) {
  try {
    // First verify the users table exists
    const tableExists = await verifyUsersTable()
    if (!tableExists) {
      console.error("Users table does not exist or is not accessible. Please run the database migrations first.")
      process.exit(1)
    }

    console.log("Validating input data...")
    // Validate input data
    const validatedData = AdminCreateSchema.safeParse({
      email,
      password,
      fullName,
      role: "admin",
      permissions: {
        manageTeam: true,
        manageLeads: true,
        manageProperties: true,
        viewReports: true,
        settings: true,
      },
    })

    if (!validatedData.success) {
      console.error("Invalid input data:", validatedData.error.errors)
      process.exit(1)
    }

    console.log("Creating user in auth.users...")
    // Create user in auth.users with metadata
    const { data: authData, error: authError } = await supabase.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
      user_metadata: {
        role: "admin",
        permissions: [
          "manage_team",
          "manage_leads",
          "manage_properties",
          "view_reports",
          "settings"
        ],
        full_name: fullName
      }
    })

    if (authError) {
      console.error("Error creating auth user:", authError)
      process.exit(1)
    }

    if (!authData.user) {
      console.error("No user returned from auth signup")
      process.exit(1)
    }

    const userData = {
      id: authData.user.id,
      email,
      full_name: fullName,
      role: "admin",
      permissions: {
        manageTeam: true,
        manageLeads: true,
        manageProperties: true,
        viewReports: true,
        settings: true,
      },
    }

    console.log("Creating user profile in users table with data:", userData)
    // Insert user data into users table
    const insertResult = await supabase
      .from("users")
      .insert([userData])
      .select()
      .single()

    console.log("Insert result:", insertResult)

    if (insertResult.error) {
      console.error("Error creating user data. Full error object:", JSON.stringify(insertResult.error, null, 2))
      // Cleanup: Delete the auth user since we couldn't create the profile
      const { error: deleteError } = await supabase.auth.admin.deleteUser(authData.user.id)
      if (deleteError) {
        console.error("Error cleaning up auth user:", deleteError)
      }
      process.exit(1)
    }

    console.log("Successfully created admin user:", {
      userId: authData.user.id,
      email,
      fullName,
    })
  } catch (error) {
    console.error("Unexpected error creating admin user:", error)
    process.exit(1)
  }
}

// Parse command line arguments
yargs(hideBin(process.argv))
  .command(
    "$0",
    "Create an admin user",
    (yargs) => {
      return yargs
        .option("email", {
          alias: "e",
          describe: "Admin user's email",
          type: "string",
          demandOption: true,
        })
        .option("name", {
          alias: "n",
          describe: "Admin user's full name",
          type: "string",
          demandOption: true,
        })
        .option("password", {
          alias: "p",
          describe: "Admin user's password",
          type: "string",
          demandOption: true,
        })
    },
    async (argv) => {
      console.log("Starting admin creation process...")
      const { email, name, password } = argv
      if (typeof email !== "string" || typeof name !== "string" || typeof password !== "string") {
        console.error("Invalid argument types")
        process.exit(1)
      }
      await createAdmin(email, name, password)
    }
  )
  .strict()
  .help()
  .argv 