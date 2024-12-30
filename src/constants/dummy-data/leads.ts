import { Lead, LeadSource, LeadStatus } from "@/lib/types/lead"

export const dummyLeads: Lead[] = [
  {
    id: "1",
    contact: {
      name: "John Doe",
      email: "john@example.com",
      phone: "+1234567890",
    },
    source: LeadSource.WEBSITE,
    status: LeadStatus.NEW,
    budget: "₹50,00,000",
    requirements: "Looking for a 2BHK apartment in Mumbai",
    notes: "Interested in gated communities",
    createdAt: new Date("2024-01-01"),
    updatedAt: new Date("2024-01-01"),
  },
  {
    id: "2",
    contact: {
      name: "Jane Smith",
      email: "jane@example.com",
      phone: "+9876543210",
    },
    source: LeadSource.MAGIC_BRICKS,
    status: LeadStatus.CONTACTED,
    budget: "₹75,00,000",
    requirements: "3BHK villa in Bangalore",
    notes: "Prefers newly constructed properties",
    createdAt: new Date("2024-01-02"),
    updatedAt: new Date("2024-01-02"),
  },
  {
    id: "3",
    contact: {
      name: "Alice Johnson",
      email: "alice@example.com",
      phone: "+1122334455",
    },
    source: LeadSource.REFERRAL,
    status: LeadStatus.QUALIFIED,
    budget: "₹1,20,00,000",
    requirements: "4BHK penthouse in Delhi",
    notes: "Looking for luxury amenities",
    createdAt: new Date("2024-01-03"),
    updatedAt: new Date("2024-01-03"),
  },
] 