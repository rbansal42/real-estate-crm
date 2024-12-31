import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { NextResponse } from "next/server"
import { logger } from "@/lib/logger"

export const dynamic = 'force-dynamic'

export async function GET(request: Request) {
  try {
    const requestUrl = new URL(request.url)
    const code = requestUrl.searchParams.get("code")
    const next = requestUrl.searchParams.get("next") || "/dashboard"
    const error = requestUrl.searchParams.get("error_description")

    // Handle error from Supabase
    if (error) {
      logger.error("Auth callback error from Supabase", { error })
      return NextResponse.redirect(
        `${requestUrl.origin}/auth/login?error=${encodeURIComponent(error)}`
      )
    }

    if (!code) {
      logger.error("No code provided in auth callback")
      return NextResponse.redirect(
        `${requestUrl.origin}/auth/login?error=missing_code`
      )
    }

    const cookieStore = cookies()
    const supabase = createRouteHandlerClient({ cookies: () => cookieStore })
    
    const { error: exchangeError } = await supabase.auth.exchangeCodeForSession(code)

    if (exchangeError) {
      logger.error("Failed to exchange code for session", { error: exchangeError })
      return NextResponse.redirect(
        `${requestUrl.origin}/auth/login?error=${encodeURIComponent(exchangeError.message)}`
      )
    }

    logger.info("Email verification successful")
    return NextResponse.redirect(`${requestUrl.origin}${next}`)
  } catch (error) {
    logger.error("Unexpected error in auth callback", { error })
    const url = new URL(request.url)
    return NextResponse.redirect(
      `${url.origin}/auth/login?error=verification_failed`
    )
  }
} 