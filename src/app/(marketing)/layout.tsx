import { Metadata } from "next"
import { Work_Sans } from "next/font/google"

const workSans = Work_Sans({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "PropDekho CRM - Real Estate CRM",
  description: "Manage your real estate business with PropDekho CRM",
}

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className={`min-h-screen ${workSans.className}`}>
      {children}
    </div>
  )
} 