import { Property } from "@/types";
import { Lead } from "@/schemas/lead.schema";

export const dummyProperties: Property[] = [
  {
    id: "1",
    title: "Luxury Villa in Green Park",
    description: "Beautiful 4BHK villa with modern amenities and garden",
    price: 25000000,
    type: "villa",
    status: "available",
    location: {
      address: "123 Green Park",
      city: "Delhi",
      state: "Delhi",
      pincode: "110016"
    },
    specifications: {
      bedrooms: 4,
      bathrooms: 4,
      area: 3500,
      parking: 2
    },
    amenities: ["Swimming Pool", "Garden", "Security", "Power Backup"],
    images: [
      "https://images.unsplash.com/photo-1613977257363-707ba9348227?q=80&w=800",
      "https://images.unsplash.com/photo-1613545325278-f24b0cae1224?q=80&w=800"
    ],
    createdAt: "2024-03-15T10:00:00Z",
    updatedAt: "2024-03-15T10:00:00Z"
  },
  {
    id: "2",
    title: "Modern Apartment in Cyber City",
    description: "Fully furnished 3BHK apartment with city view",
    price: 15000000,
    type: "apartment",
    status: "available",
    location: {
      address: "456 Cyber City",
      city: "Gurgaon",
      state: "Haryana",
      pincode: "122002"
    },
    specifications: {
      bedrooms: 3,
      bathrooms: 3,
      area: 2200,
      parking: 1
    },
    amenities: ["Gym", "Club House", "24/7 Security", "Kids Play Area"],
    images: [
      "https://images.unsplash.com/photo-1613545325278-f24b0cae1224?q=80&w=800",
      "https://images.unsplash.com/photo-1613977257363-707ba9348227?q=80&w=800"
    ],
    createdAt: "2024-03-14T15:30:00Z",
    updatedAt: "2024-03-14T15:30:00Z"
  },
  {
    id: "3",
    title: "Commercial Space in Business Hub",
    description: "Prime office space with modern infrastructure",
    price: 45000000,
    type: "commercial",
    status: "pending",
    location: {
      address: "789 Business Hub",
      city: "Mumbai",
      state: "Maharashtra",
      pincode: "400001"
    },
    specifications: {
      bedrooms: 0,
      bathrooms: 4,
      area: 5000,
      parking: 4
    },
    amenities: ["24/7 Access", "Conference Room", "Cafeteria", "High-speed Internet"],
    images: [
      "https://images.unsplash.com/photo-1613545325278-f24b0cae1224?q=80&w=800",
      "https://images.unsplash.com/photo-1613977257363-707ba9348227?q=80&w=800"
    ],
    createdAt: "2024-03-13T09:15:00Z",
    updatedAt: "2024-03-13T09:15:00Z"
  }
];

export const dummyLeads: Lead[] = [
  {
    id: "1",
    name: "Alice Brown",
    email: "alice@example.com",
    phone: "+91 98765 43210",
    status: "active",
    source: "website",
    assignedTo: "1",
    propertyInterest: ["1", "2"],
    notes: [
      {
        id: "n1",
        content: "Initial inquiry about 3BHK properties",
        createdAt: "2024-03-20T10:00:00Z",
        createdBy: "1"
      }
    ],
    lastContact: "2024-03-20T10:00:00Z",
    nextFollowup: "2024-03-25T10:00:00Z",
    budget: {
      min: 5000000,
      max: 8000000
    },
    requirements: {
      propertyType: ["apartment"],
      location: ["Andheri", "Bandra"],
      minBedrooms: 3,
      minBathrooms: 2,
      minArea: 1200
    },
    createdAt: "2024-03-20T10:00:00Z",
    updatedAt: "2024-03-20T10:00:00Z"
  },
  {
    id: "2",
    name: "Bob Wilson",
    email: "bob@example.com",
    phone: "+91 98765 43211",
    status: "pending",
    source: "partner_referral",
    assignedTo: "2",
    propertyInterest: ["3"],
    notes: [
      {
        id: "n2",
        content: "Looking for commercial space",
        createdAt: "2024-03-19T14:00:00Z",
        createdBy: "2"
      }
    ],
    lastContact: "2024-03-19T14:00:00Z",
    nextFollowup: "2024-03-22T14:00:00Z",
    budget: {
      min: 40000000,
      max: 50000000
    },
    requirements: {
      propertyType: ["commercial"],
      location: ["Business Hub"],
      minArea: 4000
    },
    createdAt: "2024-03-19T14:00:00Z",
    updatedAt: "2024-03-19T14:00:00Z"
  },
  {
    id: "3",
    name: "Charlie Davis",
    email: "charlie@example.com",
    phone: "+91 98765 43212",
    status: "new",
    source: "mobile_app",
    propertyInterest: [],
    notes: [],
    budget: {
      min: 10000000,
      max: 15000000
    },
    requirements: {
      propertyType: ["villa", "house"],
      location: ["Powai", "Juhu"],
      minBedrooms: 4,
      minBathrooms: 3,
      minArea: 2000
    },
    createdAt: "2024-03-21T09:00:00Z",
    updatedAt: "2024-03-21T09:00:00Z"
  }
]; 