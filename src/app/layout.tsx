"use client"

import { Work_Sans } from "next/font/google"
import { ThemeProvider } from "@/components/providers/theme-provider"
import { AuthProvider } from "@/components/providers/auth-provider"
import { QueryProvider } from "@/components/providers/query-provider"
import { Toaster } from "@/components/ui/toaster"
import { cn } from "@/lib/utils"
import "@/styles/globals.css"

const workSans = Work_Sans({ subsets: ["latin"] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body className={cn("min-h-screen bg-background antialiased", workSans.className)}>
        <ThemeProvider
          themes={["light", "dark", "system"]}
          defaultTheme="system"
          storageKey="propdekho-theme"
        >
          <QueryProvider>
            <AuthProvider>
              {children}
              <Toaster />
            </AuthProvider>
          </QueryProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
