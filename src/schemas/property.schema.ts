import { z } from 'zod';

export const createPropertySchema = z.object({
  title: z.string().min(3).max(100),
  description: z.string().min(10).max(1000),
  price: z.number().positive(),
  location: z.object({
    address: z.string(),
    city: z.string(),
    state: z.string(),
    country: z.string(),
    coordinates: z.object({
      lat: z.number(),
      lng: z.number(),
    }),
  }),
  specifications: z.object({
    bedrooms: z.number().int().min(0),
    bathrooms: z.number().min(0),
    area: z.number().positive(),
    yearBuilt: z.number().int().min(1800).max(new Date().getFullYear()),
  }),
  status: z.enum(['available', 'sold', 'rented']),
  propertyType: z.enum(['apartment', 'house', 'villa', 'commercial']),
}); 