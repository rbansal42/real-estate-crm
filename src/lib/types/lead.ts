export enum LeadSource {
  DIRECT = "DIRECT",
  WEBSITE = "WEBSITE",
  REFERRAL = "REFERRAL",
  SOCIAL_MEDIA = "SOCIAL_MEDIA",
  MAGIC_BRICKS = "MAGIC_BRICKS",
  NINETY_NINE_ACRES = "NINETY_NINE_ACRES",
  HOUSING = "HOUSING",
  OTHER = "OTHER",
}

export enum LeadStatus {
  NEW = "NEW",
  CONTACTED = "CONTACTED",
  QUALIFIED = "QUALIFIED",
  PROPOSAL = "PROPOSAL",
  NEGOTIATION = "NEGOTIATION",
  WON = "WON",
  LOST = "LOST",
  INACTIVE = "INACTIVE",
}

export interface Contact {
  name: string;
  email: string;
  phone: string;
}

export interface Lead {
  id: string;
  contact: Contact;
  source: LeadSource;
  status: LeadStatus;
  notes?: string;
  budget?: string;
  requirements?: string;
  createdAt: Date;
  updatedAt: Date;
} 