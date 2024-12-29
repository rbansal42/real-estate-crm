import { useState, useEffect } from 'react'
import { logger } from '@/lib/logger'

export interface Requirement {
  type: string
  budget: string
  location: string
  propertyType: string
  bedrooms: number
}

export interface Interaction {
  id: string
  type: 'Call' | 'Email' | 'Meeting' | 'WhatsApp'
  notes: string
  date: string
  agent: string
}

export interface Lead {
  id: string
  name: string
  email: string
  phone: string
  source: string
  status: string
  assignedTo: string
  createdAt: string
  requirements: Requirement
  interactions: Interaction[]
  agent: {
    name: string
    role: string
    avatar?: string
  }
  schedules: Array<{
    id: string
    date: string
    time: string
    type: string
    notes: string
  }>
}

// Temporary dummy data
const dummyLeads: Lead[] = [
  {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    phone: "+91 9876543210",
    source: "MagicBricks",
    status: "New",
    assignedTo: "Sarah Smith",
    createdAt: "2024-03-20",
    requirements: {
      type: "Residential",
      budget: "₹50L - ₹75L",
      location: "Whitefield, Bangalore",
      propertyType: "2 BHK Apartment",
      bedrooms: 2
    },
    interactions: [
      {
        id: "int1",
        type: "Call",
        notes: "Initial discussion about requirements. Looking for a 2BHK in Whitefield area.",
        date: "2024-03-20 14:30",
        agent: "Sarah Smith"
      },
      {
        id: "int2",
        type: "Email",
        notes: "Sent property recommendations for 3 properties in Whitefield matching budget.",
        date: "2024-03-21 11:15",
        agent: "Sarah Smith"
      },
      {
        id: "int3",
        type: "WhatsApp",
        notes: "Shared virtual tour links of the properties.",
        date: "2024-03-21 15:45",
        agent: "Sarah Smith"
      }
    ],
    agent: {
      name: "Sarah Smith",
      role: "Senior Sales Agent",
      avatar: undefined
    },
    schedules: []
  },
  {
    id: "2",
    name: "Priya Sharma",
    email: "priya.sharma@gmail.com",
    phone: "+91 9876543211",
    source: "99acres",
    status: "Qualified",
    assignedTo: "Mike Johnson",
    createdAt: "2024-03-19",
    requirements: {
      type: "Commercial",
      budget: "₹2Cr - ₹3Cr",
      location: "Indiranagar, Bangalore",
      propertyType: "Office Space",
      bedrooms: 0
    },
    interactions: [
      {
        id: "int4",
        type: "Meeting",
        notes: "Site visit to commercial property in Indiranagar. Client liked the location.",
        date: "2024-03-19 10:00",
        agent: "Mike Johnson"
      },
      {
        id: "int5",
        type: "Call",
        notes: "Discussion about lease terms and pricing negotiation.",
        date: "2024-03-20 16:30",
        agent: "Mike Johnson"
      }
    ],
    agent: {
      name: "Mike Johnson",
      role: "Commercial Property Specialist",
      avatar: undefined
    },
    schedules: []
  }
]

export function useLeadsData() {
  const [data, setData] = useState<Lead[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch leads data from API
        const response = await fetch('/api/leads')
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        const leads = await response.json()
        
        // Fetch additional details for each lead in parallel
        const leadsWithDetails = await Promise.all(
          leads.map(async (lead: Lead) => {
            const [requirements, interactions, agent] = await Promise.all([
              fetch(`/api/leads/${lead.id}/requirements`).then(res => res.json()),
              fetch(`/api/leads/${lead.id}/interactions`).then(res => res.json()),
              fetch(`/api/leads/${lead.id}/agent`).then(res => res.json())
            ])

            return {
              ...lead,
              requirements,
              interactions,
              agent
            }
          })
        )

        setData(leadsWithDetails)
        logger.info('Leads data fetched successfully', { count: leadsWithDetails.length })
      } catch (error: unknown) {
        const err = error instanceof Error ? error : new Error('Unknown error occurred')
        setError(err)
        logger.error('Error fetching leads data:', { error })
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  return { data, isLoading, error }
} 