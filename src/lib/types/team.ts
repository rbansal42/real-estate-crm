export type TeamMemberRole = 
  | 'admin'
  | 'manager'
  | 'agent'
  | 'support'
  | 'viewer';

export type TeamMemberStatus = 
  | 'active'
  | 'inactive'
  | 'pending'
  | 'blocked';

export type TeamMemberDepartment = 
  | 'sales'
  | 'marketing'
  | 'support'
  | 'operations'
  | 'management';

export interface TeamMemberPermissions {
  canManageTeam: boolean;
  canManageLeads: boolean;
  canManageProperties: boolean;
  canViewReports: boolean;
  canManageSettings: boolean;
  canDeleteRecords: boolean;
  canExportData: boolean;
}

export interface TeamMemberStats {
  totalLeads: number;
  activeLeads: number;
  closedDeals: number;
  conversionRate: number;
  lastActivityAt?: string;
}

export interface TeamMember {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: TeamMemberRole;
  department: TeamMemberDepartment;
  status: TeamMemberStatus;
  permissions: TeamMemberPermissions;
  stats: TeamMemberStats;
  avatar?: string;
  title?: string;
  bio?: string;
  joinedAt: string;
  lastLoginAt?: string;
  createdAt: string;
  updatedAt: string;
  supervisor?: string;
  subordinates?: string[];
  tags?: string[];
  notes?: string;
} 