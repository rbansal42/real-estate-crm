export interface AdminCreateData {
  email: string
  password: string
  fullName: string
  role: 'admin'
  permissions: {
    manageTeam: true
    manageLeads: true
    manageProperties: true
    viewReports: true
    settings: true
  }
}

export interface AdminResponse {
  success: boolean
  error?: string
  data?: {
    id: string
    email: string
    fullName: string
  }
}

export type AdminPermissions = AdminCreateData['permissions'] 