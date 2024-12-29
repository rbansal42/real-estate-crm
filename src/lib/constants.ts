export const LEAD_STATUS_CONFIG = {
  New: {
    color: "bg-blue-500 hover:bg-blue-600",
    textColor: "text-white",
    icon: "Star",
  },
  Contacted: {
    color: "bg-indigo-500 hover:bg-indigo-600",
    textColor: "text-white",
    icon: "PhoneCall",
  },
  Qualified: {
    color: "bg-emerald-500 hover:bg-emerald-600",
    textColor: "text-white",
    icon: "CheckCircle",
  },
  Proposal: {
    color: "bg-amber-500 hover:bg-amber-600",
    textColor: "text-white",
    icon: "FileText",
  },
  Negotiation: {
    color: "bg-purple-500 hover:bg-purple-600",
    textColor: "text-white",
    icon: "HandShake",
  },
  "Closed Won": {
    color: "bg-green-500 hover:bg-green-600",
    textColor: "text-white",
    icon: "Trophy",
  },
  "Closed Lost": {
    color: "bg-red-500 hover:bg-red-600",
    textColor: "text-white",
    icon: "XCircle",
  },
} as const

export type LeadStatus = keyof typeof LEAD_STATUS_CONFIG 