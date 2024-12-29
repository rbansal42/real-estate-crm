export type UserRole = 'admin' | 'manager' | 'agent' | 'support'
export type Department = 'sales' | 'operations' | 'marketing' | 'support'

export interface TeamMember {
  id: string
  name: string
  email: string
  phone: string
  role: UserRole
  department: Department
  joinedAt: string
  status: 'active' | 'inactive'
  avatar?: string
  reportingTo?: {
    id: string
    name: string
    role: UserRole
  }
  performance?: {
    leadsHandled: number
    conversionRate: number
    activeLeads: number
  }
  personalInfo: {
    address: string
    emergencyContact: string
    dateOfBirth: string
  }
} 