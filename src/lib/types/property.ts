export type PropertyType = 'apartment' | 'house' | 'villa' | 'plot' | 'commercial' | 'office';
export type PropertyStatus = 'available' | 'sold' | 'rented' | 'pending' | 'off-market';
export type PropertyCategory = 'residential' | 'commercial' | 'industrial' | 'land';
export type ListingType = 'sale' | 'rent' | 'lease';

export interface PropertyImage {
  id: string;
  url: string;
  alt: string;
  isPrimary?: boolean;
}

export interface PropertyLocation {
  address: string;
  city: string;
  state: string;
  country: string;
  pincode: string;
  latitude?: number;
  longitude?: number;
}

export interface PropertyPricing {
  price: number;
  pricePerSqFt: number;
  maintenanceCharges?: number;
  bookingAmount?: number;
  currency: string;
  negotiable: boolean;
}

export interface PropertySpecifications {
  bedrooms?: number;
  bathrooms?: number;
  balconies?: number;
  totalFloors?: number;
  floorNumber?: number;
  furnishing?: 'unfurnished' | 'semi-furnished' | 'fully-furnished';
  superBuiltupArea: number;
  carpetArea: number;
  parking?: number;
  ageOfProperty?: number;
  availableFrom: string;
}

export interface PropertyAmenity {
  id: string;
  name: string;
  category: 'security' | 'convenience' | 'sports' | 'leisure' | 'other';
  icon?: string;
}

export interface Property {
  id: string;
  title: string;
  description: string;
  type: PropertyType;
  category: PropertyCategory;
  status: PropertyStatus;
  listingType: ListingType;
  location: PropertyLocation;
  specifications: PropertySpecifications;
  pricing: PropertyPricing;
  amenities: PropertyAmenity[];
  images: PropertyImage[];
  assignedTo?: string; // Team member ID
  createdAt: string;
  updatedAt: string;
  publishedAt?: string;
  featured: boolean;
  verified: boolean;
  tags: string[];
} 