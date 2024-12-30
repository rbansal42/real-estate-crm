export type LeadStatus = 
  | 'new'
  | 'contacted'
  | 'qualified'
  | 'proposal'
  | 'negotiation'
  | 'closed'
  | 'lost';

export const LEAD_STATUS_CONFIG = {
  new: {
    label: 'New',
    color: 'bg-blue-500',
    textColor: 'text-white',
    icon: 'Star',
  },
  contacted: {
    label: 'Contacted',
    color: 'bg-purple-500',
    textColor: 'text-white',
    icon: 'PhoneCall',
  },
  qualified: {
    label: 'Qualified',
    color: 'bg-green-500',
    textColor: 'text-white',
    icon: 'CheckCircle',
  },
  proposal: {
    label: 'Proposal',
    color: 'bg-yellow-500',
    textColor: 'text-white',
    icon: 'FileText',
  },
  negotiation: {
    label: 'Negotiation',
    color: 'bg-orange-500',
    textColor: 'text-white',
    icon: 'MessageSquare',
  },
  closed: {
    label: 'Closed',
    color: 'bg-indigo-500',
    textColor: 'text-white',
    icon: 'CheckCircle2',
  },
  lost: {
    label: 'Lost',
    color: 'bg-red-500',
    textColor: 'text-white',
    icon: 'XCircle',
  },
} as const; 