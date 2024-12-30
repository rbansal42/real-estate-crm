import { LeadSource, LeadStatus } from '../types/lead';

export const LEAD_STATUS_CONFIG: Record<LeadStatus, {
  label: string;
  color: string;
  textColor: string;
  icon: string;
}> = {
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
};

export const LEAD_SOURCE_CONFIG: Record<LeadSource, {
  label: string;
  icon: string;
}> = {
  '99acres': {
    label: '99acres',
    icon: 'Building',
  },
  magicbricks: {
    label: 'MagicBricks',
    icon: 'Building2',
  },
  website: {
    label: 'Website',
    icon: 'Globe',
  },
  referral: {
    label: 'Referral',
    icon: 'Users',
  },
  direct: {
    label: 'Direct',
    icon: 'UserPlus',
  },
  other: {
    label: 'Other',
    icon: 'MoreHorizontal',
  },
};

export const LEAD_PRIORITY_CONFIG = {
  low: {
    label: 'Low',
    color: 'bg-slate-500',
    textColor: 'text-white',
    icon: 'ArrowDown',
  },
  medium: {
    label: 'Medium',
    color: 'bg-yellow-500',
    textColor: 'text-white',
    icon: 'ArrowRight',
  },
  high: {
    label: 'High',
    color: 'bg-red-500',
    textColor: 'text-white',
    icon: 'ArrowUp',
  },
} as const;

export const PROPERTY_TYPES = [
  'Apartment',
  'Villa',
  'Independent House',
  'Plot',
  'Commercial Space',
  'Office Space',
  'Shop',
  'Warehouse',
  'Other',
] as const;

export const AREA_UNITS = ['sqft', 'sqm'] as const; 