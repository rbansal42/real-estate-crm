import type { Metadata } from "next"
import { Work_Sans } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/providers/theme-provider"
import { QueryProvider } from "@/components/providers/query-provider"
import { Toaster } from "@/components/ui/toaster"
import ClientLayout from "./layout.client"

const workSans = Work_Sans({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "PropDekho CRM",
  description: "Real Estate CRM for managing leads, teams, and properties",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={workSans.className}>
        <ThemeProvider>
          <QueryProvider>
            <ClientLayout>
              {children}
            </ClientLayout>
            <Toaster />
          </QueryProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
