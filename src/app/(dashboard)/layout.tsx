import { Metadata } from "next"
import { Work_Sans } from "next/font/google"
import { Header } from "@/components/layout/header"
import { Sidebar } from "@/components/layout/sidebar"

const workSans = Work_Sans({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Dashboard - PropDekho CRM",
  description: "Manage your real estate business with PropDekho CRM",
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className={`min-h-screen flex ${workSans.className}`}>
      <Sidebar />
      <div className="flex-1">
        <Header />
        <main className="flex-1 p-6">
          {children}
        </main>
      </div>
    </div>
  )
} 