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
  {
    id: "2",
    name: "Sarah Wilson",
    email: "sarah@example.com",
    phone: "+91 9876543212",
    role: "manager",
    department: "sales",
    joinedAt: "2023-02-15",
    status: "active",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
    performance: {
      leadsHandled: 280,
      conversionRate: 72,
      activeLeads: 65
    },
    personalInfo: {
      address: "456 Oak Lane, City",
      emergencyContact: "Mike Wilson - Husband - +91 9876543213",
      dateOfBirth: "1988-08-20"
    }
  },
  {
    id: "3",
    name: "Raj Kumar",
    email: "raj@example.com",
    phone: "+91 9876543214",
    role: "agent",
    department: "sales",
    joinedAt: "2023-03-10",
    status: "active",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Raj",
    reportingTo: {
      id: "2",
      name: "Sarah Wilson",
      role: "manager"
    },
    performance: {
      leadsHandled: 120,
      conversionRate: 65,
      activeLeads: 30
    },
    personalInfo: {
      address: "789 Park Road, City",
      emergencyContact: "Priya Kumar - Wife - +91 9876543215",
      dateOfBirth: "1992-11-30"
    }
  },
  {
    id: "4",
    name: "Emily Chen",
    email: "emily@example.com",
    phone: "+91 9876543216",
    role: "manager",
    department: "operations",
    joinedAt: "2023-01-20",
    status: "active",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emily",
    performance: {
      leadsHandled: 200,
      conversionRate: 70,
      activeLeads: 55
    },
    personalInfo: {
      address: "101 River View, City",
      emergencyContact: "David Chen - Brother - +91 9876543217",
      dateOfBirth: "1991-04-25"
    }
  },
  {
    id: "5",
    name: "Michael Brown",
    email: "michael@example.com",
    phone: "+91 9876543218",
    role: "support",
    department: "support",
    joinedAt: "2023-04-05",
    status: "active",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Michael",
    reportingTo: {
      id: "4",
      name: "Emily Chen",
      role: "manager"
    },
    performance: {
      leadsHandled: 90,
      conversionRate: 60,
      activeLeads: 25
    },
    personalInfo: {
      address: "202 Hill Street, City",
      emergencyContact: "Lisa Brown - Sister - +91 9876543219",
      dateOfBirth: "1994-07-12"
    }
  },
  {
    id: "6",
    name: "Priya Sharma",
    email: "priya@example.com",
    phone: "+91 9876543220",
    role: "agent",
    department: "sales",
    joinedAt: "2023-05-15",
    status: "active",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Priya",
    reportingTo: {
      id: "2",
      name: "Sarah Wilson",
      role: "manager"
    },
    performance: {
      leadsHandled: 85,
      conversionRate: 62,
      activeLeads: 28
    },
    personalInfo: {
      address: "303 Garden Road, City",
      emergencyContact: "Arun Sharma - Father - +91 9876543221",
      dateOfBirth: "1995-09-18"
    }
  },
  {
    id: "7",
    name: "Alex Thompson",
    email: "alex@example.com",
    phone: "+91 9876543222",
    role: "manager",
    department: "marketing",
    joinedAt: "2023-02-01",
    status: "active",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
    performance: {
      leadsHandled: 180,
      conversionRate: 75,
      activeLeads: 50
    },
    personalInfo: {
      address: "404 Lake View, City",
      emergencyContact: "Emma Thompson - Wife - +91 9876543223",
      dateOfBirth: "1989-12-05"
    }
  },
  {
    id: "8",
    name: "Amit Patel",
    email: "amit@example.com",
    phone: "+91 9876543224",
    role: "agent",
    department: "sales",
    joinedAt: "2023-06-20",
    status: "inactive",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Amit",
    reportingTo: {
      id: "2",
      name: "Sarah Wilson",
      role: "manager"
    },
    performance: {
      leadsHandled: 45,
      conversionRate: 58,
      activeLeads: 15
    },
    personalInfo: {
      address: "505 Sun Street, City",
      emergencyContact: "Meera Patel - Mother - +91 9876543225",
      dateOfBirth: "1993-03-28"
    }
  },
  {
    id: "9",
    name: "Lisa Wang",
    email: "lisa@example.com",
    phone: "+91 9876543226",
    role: "support",
    department: "support",
    joinedAt: "2023-07-10",
    status: "active",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Lisa",
    reportingTo: {
      id: "4",
      name: "Emily Chen",
      role: "manager"
    },
    performance: {
      leadsHandled: 60,
      conversionRate: 55,
      activeLeads: 20
    },
    personalInfo: {
      address: "606 Moon Road, City",
      emergencyContact: "Tom Wang - Husband - +91 9876543227",
      dateOfBirth: "1996-01-15"
    }
  },
  {
    id: "10",
    name: "David Miller",
    email: "david@example.com",
    phone: "+91 9876543228",
    role: "agent",
    department: "operations",
    joinedAt: "2023-08-01",
    status: "active",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=David",
    reportingTo: {
      id: "4",
      name: "Emily Chen",
      role: "manager"
    },
    performance: {
      leadsHandled: 70,
      conversionRate: 63,
      activeLeads: 22
    },
    personalInfo: {
      address: "707 Star Avenue, City",
      emergencyContact: "Sarah Miller - Wife - +91 9876543229",
      dateOfBirth: "1992-06-20"
    }
  }
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