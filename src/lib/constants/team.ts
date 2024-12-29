export const USER_ROLES = {
  admin: {
    label: 'Administrator',
    color: 'bg-red-500',
    permissions: ['manage_team', 'manage_leads', 'manage_settings', 'view_reports']
  },
  manager: {
    label: 'Manager',
    color: 'bg-indigo-500',
    permissions: ['manage_team', 'manage_leads', 'view_reports']
  },
  agent: {
    label: 'Sales Agent',
    color: 'bg-blue-500',
    permissions: ['manage_leads', 'view_reports']
  },
  support: {
    label: 'Support Staff',
    color: 'bg-green-500',
    permissions: ['view_leads', 'view_reports']
  }
} as const

export const DEPARTMENTS = {
  sales: {
    label: 'Sales',
    color: 'bg-blue-500'
  },
  operations: {
    label: 'Operations',
    color: 'bg-amber-500'
  },
  marketing: {
    label: 'Marketing',
    color: 'bg-green-500'
  },
  support: {
    label: 'Support',
    color: 'bg-purple-500'
  }
} as const 