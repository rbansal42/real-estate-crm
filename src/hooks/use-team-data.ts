import { useState, useEffect } from "react"
import { TeamMember } from "@/lib/types/team"
import { logger } from "@/lib/logger"

// Mock data for demonstration
const mockTeamData: TeamMember[] = [
  {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    phone: "+91 9876543210",
    role: "admin",
    department: "sales",
    joinedAt: "2023-01-01",
    status: "active",
    avatar: undefined,
    performance: {
      leadsHandled: 150,
      conversionRate: 68,
      activeLeads: 45
    },
    personalInfo: {
      address: "123 Main St, City",
      emergencyContact: "Jane Doe - Wife - +91 9876543211",
      dateOfBirth: "1990-05-15"
    }
  },
  // Add more mock data as needed
]

export function useTeamData() {
  const [data, setData] = useState<TeamMember[] | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        // In a real application, this would be an API call
        logger.info("Fetching team data")
        setData(mockTeamData)
      } catch (err) {
        logger.error("Error fetching team data:", err)
        setError(err as Error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  return { data, isLoading, error }
} 