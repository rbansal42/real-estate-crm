import { z } from 'zod';

export const leadSchema = z.object({
  id: z.string(),
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 characters"),
  status: z.enum(['new', 'active', 'pending', 'booked', 'not_interested', 'closed']),
  source: z.enum(['website', 'mobile_app', 'direct_call', 'partner_referral', 'other']),
  assignedTo: z.string().optional(),
  propertyInterest: z.array(z.string()),
  notes: z.array(z.object({
    id: z.string(),
    content: z.string(),
    createdAt: z.string(),
    createdBy: z.string()
  })),
  lastContact: z.string().optional(),
  nextFollowup: z.string().optional(),
  budget: z.object({
    min: z.number(),
    max: z.number()
  }),
  requirements: z.object({
    propertyType: z.array(z.string()),
    location: z.array(z.string()),
    minBedrooms: z.number().optional(),
    minBathrooms: z.number().optional(),
    minArea: z.number().optional()
  }),
  createdAt: z.string(),
  updatedAt: z.string()
});

export type Lead = z.infer<typeof leadSchema>;
export type CreateLeadInput = Omit<Lead, 'id' | 'createdAt' | 'updatedAt' | 'notes'>;
export type UpdateLeadInput = Partial<CreateLeadInput>; 