import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { MainNav } from "@/components/layout/main-nav"
import { SideNav } from "@/components/layout/side-nav"
import { UserNav } from "@/components/layout/user-nav"
import { logger } from "@/lib/logger"

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = createServerComponentClient({ cookies })
  const { data: { session }, error } = await supabase.auth.getSession()

  if (error) {
    logger.error("Error getting session in app layout", { error })
    redirect("/auth/login")
  }

  if (!session) {
    redirect("/auth/login")
  }

  const { user } = session

  return (
    <div className="flex min-h-screen flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center">
          <MainNav />
          <div className="ml-auto flex items-center space-x-4">
            <UserNav
              user={{
                name: user.user_metadata?.full_name || user.email,
                image: user.user_metadata?.avatar_url,
                email: user.email,
              }}
            />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className="hidden w-[200px] flex-col md:flex">
          <SideNav />
        </aside>

        {/* Page Content */}
        <main className="flex-1">{children}</main>
      </div>
    </div>
  )
} 