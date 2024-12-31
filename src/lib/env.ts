import { logger } from "./logger"

// Required environment variables with their types
interface RequiredEnvVars {
  NEXT_PUBLIC_SUPABASE_URL: string
  NEXT_PUBLIC_SUPABASE_ANON_KEY: string
}

// Optional environment variables with their types
interface OptionalEnvVars {
  SUPABASE_SERVICE_ROLE_KEY?: string
}

// Validate and get required environment variables
function getRequiredEnvVars(): RequiredEnvVars {
  const vars: Partial<RequiredEnvVars> = {
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  }

  // Check for missing required variables
  const missingVars = Object.entries(vars).filter(([_, value]) => !value)
  if (missingVars.length > 0) {
    const missing = missingVars.map(([key]) => key).join(", ")
    logger.error(`Missing required environment variables: ${missing}`)
    throw new Error(`Missing required environment variables: ${missing}`)
  }

  return vars as RequiredEnvVars
}

// Get optional environment variables
function getOptionalEnvVars(): OptionalEnvVars {
  return {
    SUPABASE_SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY,
  }
}

// Export validated environment variables
export const env = {
  ...getRequiredEnvVars(),
  ...getOptionalEnvVars(),
} as const

// Type for environment variables
export type Env = typeof env 