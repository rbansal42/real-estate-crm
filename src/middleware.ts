import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import type { Session } from '@supabase/supabase-js'
import { logger } from '@/lib/logger'

export async function middleware(request: NextRequest) {
  try {
    const res = NextResponse.next()
    const supabase = createMiddlewareClient({ req: request, res })
    const { pathname } = request.nextUrl

    // List of public paths that don't require authentication
    const isPublicPath = 
      pathname === "/" || 
      pathname.startsWith("/auth/") ||
      pathname === "/auth"

    // Allow auth callback to proceed without any checks
    if (pathname === "/auth/callback") {
      return res
    }

    // Refresh session if expired and get current session
    const {
      data: { session },
      error: sessionError,
    } = await supabase.auth.getSession()

    if (sessionError) {
      logger.error('Error getting session', { error: sessionError })
      // Continue as unauthenticated if there's a session error
      return handleAuthRedirect(request, null, pathname, isPublicPath)
    }

    logger.info("Middleware check", {
      path: pathname,
      isAuth: !!session,
      isPublicPath,
      userId: session?.user?.id,
    })

    return handleAuthRedirect(request, session, pathname, isPublicPath)
  } catch (error) {
    logger.error('Middleware error', { error })
    return NextResponse.redirect(new URL("/auth/login", request.url))
  }
}

function handleAuthRedirect(
  request: NextRequest,
  session: Session | null,
  pathname: string,
  isPublicPath: boolean
) {
  const res = NextResponse.next()

  // Redirect authenticated users from public pages to dashboard
  if (isPublicPath) {
    if (session) {
      logger.info("Redirecting authenticated user to dashboard")
      return NextResponse.redirect(new URL("/dashboard", request.url))
    }
    return res
  }

  // Redirect unauthenticated users to login
  if (!session) {
    logger.warn("Unauthorized access attempt", { path: pathname })
    const from = encodeURIComponent(pathname + request.nextUrl.search)
    return NextResponse.redirect(new URL(`/auth/login?from=${from}`, request.url))
  }

  // Handle role-based access for admin routes
  if (pathname.startsWith("/admin")) {
    if (session.user.user_metadata?.role !== "admin") {
      logger.warn("Unauthorized admin access attempt", {
        userId: session.user.id,
        role: session.user.user_metadata?.role,
        path: pathname,
      })
      return NextResponse.redirect(new URL("/dashboard", request.url))
    }
  }

  // Handle role-based access for team management
  if (pathname.startsWith("/team") && !session.user.user_metadata?.permissions?.includes("manage_team")) {
    logger.warn("Unauthorized team management access attempt", {
      userId: session.user.id,
      role: session.user.user_metadata?.role,
      path: pathname,
    })
    return NextResponse.redirect(new URL("/dashboard", request.url))
  }

  return res
}

// Specify which paths should trigger the middleware
export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|mp4)$).*)',
  ],
} 