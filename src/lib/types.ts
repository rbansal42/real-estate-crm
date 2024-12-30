import { LeadStatus } from "./constants"

export interface Lead {
  id: string
  name: string
  email: string
  phone: string
  source: string
  status: LeadStatus
  assignedTo: string
  createdAt: string
  requirements?: {
    propertyType?: string
    budget?: {
      min: number
      max: number
    }
    location?: string[]
    area?: {
      min: number
      max: number
      unit: 'sqft' | 'sqm'
    }
  }
  interactions?: Array<{
    id: string
    type: 'call' | 'email' | 'meeting' | 'note'
    date: string
    notes?: string
    outcome?: string
  }>
  schedules?: Array<{
    id: string
    date: string
    time: string
    type: 'call' | 'meeting' | 'site-visit'
    notes?: string
  }>
} 