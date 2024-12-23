export type PropertyStatus = 'available' | 'sold' | 'rented' | 'pending';
export type PropertyType = 'apartment' | 'house' | 'villa' | 'plot' | 'commercial';

export interface Property {
  id: string;
  title: string;
  description: string;
  price: number;
  type: PropertyType;
  status: PropertyStatus;
  location: {
    address: string;
    city: string;
    state: string;
    pincode: string;
  };
  specifications: {
    bedrooms: number;
    bathrooms: number;
    area: number; // in sq ft
    parking: number;
  };
  amenities: string[];
  images: string[];
  createdAt: string;
  updatedAt: string;
}

export type CreatePropertyInput = Omit<Property, 'id' | 'createdAt' | 'updatedAt'>;
export type UpdatePropertyInput = Partial<CreatePropertyInput>; 