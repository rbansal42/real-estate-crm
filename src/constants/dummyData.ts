import { Property } from "@/types";

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