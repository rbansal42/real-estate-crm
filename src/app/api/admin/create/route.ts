import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { NextResponse } from "next/server"
import { AdminCreateSchema } from "@/lib/validations/auth"
import { createAdminUser } from "@/lib/services/admin"
import { logger } from "@/lib/logger"
import { rateLimit } from "@/lib/utils/rate-limit"

const limiter = rateLimit({
  interval: 60 * 60 * 1000, // 1 hour
  uniqueTokenPerInterval: 500,
})

export async function POST(request: Request) {
  try {
    // Rate limiting
    try {
      await limiter.check(5, "create_admin_rate_limit") // 5 requests per hour
    } catch {
      return new NextResponse("Rate limit exceeded", { status: 429 })
    }

    const supabase = createRouteHandlerClient({ cookies })
    const json = await request.json()

    // Validate request body
    const validatedData = AdminCreateSchema.safeParse(json)
    if (!validatedData.success) {
      logger.warn("Invalid admin creation data", { errors: validatedData.error })
      return new NextResponse(JSON.stringify({
        error: "Invalid request data",
        details: validatedData.error.errors,
      }), { 
        status: 400,
        headers: { "Content-Type": "application/json" },
      })
    }

    // Check if user is authorized (should be a super admin)
    const {
      data: { session },
    } = await supabase.auth.getSession()

    if (!session) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    // Get user's role
    const { data: userData } = await supabase
      .from("users")
      .select("role")
      .eq("id", session.user.id)
      .single()

    if (!userData || userData.role !== "admin") {
      return new NextResponse("Forbidden", { status: 403 })
    }

    // Create admin user
    const result = await createAdminUser(validatedData.data)

    if (!result.success) {
      return new NextResponse(JSON.stringify({
        error: result.error,
      }), { 
        status: 400,
        headers: { "Content-Type": "application/json" },
      })
    }

    return new NextResponse(JSON.stringify(result), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    })
  } catch (error) {
    logger.error("Error in admin creation route", { error })
    return new NextResponse("Internal Server Error", { status: 500 })
  }
} 