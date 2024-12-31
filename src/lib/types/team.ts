export interface TeamMember {
  id: string
  name: string
  email: string
  role: 'admin' | 'manager' | 'agent'
  status: 'active' | 'inactive'
  joinedAt: string
  permissions: TeamPermissions
  avatar?: string
  createdAt: string
  updatedAt: string
}

export interface TeamMemberFormData {
  name: string
  email: string
  role: TeamMember['role']
  status: TeamMember['status']
  permissions: TeamPermissions
  joinedAt: string
}

export interface TeamPermissions {
  manageTeam: boolean
  manageLeads: boolean
  manageProperties: boolean
  viewReports: boolean
  settings: boolean
}

export interface BulkActionPayload {
  ids: string[]
  data: Partial<TeamMember>
}

export type TeamRole = 'admin' | 'manager' | 'agent'
export type TeamStatus = 'active' | 'inactive'

export interface TeamTableFilters {
  role?: TeamRole
  status?: TeamStatus
  search?: string
}

export interface BulkAction {
  label: string
  value: string
  icon?: React.ComponentType<{ className?: string }>
  destructive?: boolean
} 