export enum LeadSource {
  WEBSITE = 'WEBSITE',
  REFERRAL = 'REFERRAL',
  MAGIC_BRICKS = 'MAGIC_BRICKS',
  NINETY_NINE_ACRES = '99ACRES',
  HOUSING = 'HOUSING',
  DIRECT = 'DIRECT',
  OTHER = 'OTHER',
}

export enum LeadStatus {
  NEW = 'NEW',
  IN_PROGRESS = 'IN_PROGRESS',
  FOLLOW_UP = 'FOLLOW_UP',
  QUALIFIED = 'QUALIFIED',
  NEGOTIATION = 'NEGOTIATION',
  WON = 'WON',
  LOST = 'LOST',
  ON_HOLD = 'ON_HOLD',
}

export interface Lead {
  id: string;
  contact: {
    name: string;
    email: string;
    phone: string;
    address?: string;
  };
  source: LeadSource;
  status: LeadStatus;
  budget: {
    min: number;
    max: number;
  };
  requirements: string;
  notes: string;
  assignedTo?: string;
  propertyPreferences?: {
    type: string[];
    location: string[];
    minBedrooms?: number;
    maxBedrooms?: number;
    minBathrooms?: number;
    maxBathrooms?: number;
    minArea?: number;
    maxArea?: number;
  };
  priority: 'low' | 'medium' | 'high';
  createdAt: string;
  updatedAt: string;
} 