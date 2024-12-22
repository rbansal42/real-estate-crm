export interface Property {
  id: string;
  title: string;
  description: string;
  price: number;
  location: {
    address: string;
    city: string;
    state: string;
    country: string;
    coordinates: {
      lat: number;
      lng: number;
    };
  };
  specifications: {
    bedrooms: number;
    bathrooms: number;
    area: number;
    yearBuilt: number;
  };
  status: 'available' | 'sold' | 'rented';
  propertyType: 'apartment' | 'house' | 'villa' | 'commercial';
  createdAt: string;
  updatedAt: string;
}

export type CreatePropertyInput = Omit<Property, 'id' | 'createdAt' | 'updatedAt'>;
export type UpdatePropertyInput = Partial<CreatePropertyInput>; 