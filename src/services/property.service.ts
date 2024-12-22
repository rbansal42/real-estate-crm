import { apiClient } from './api.service';
import type { 
  Property, 
  CreatePropertyInput, 
  UpdatePropertyInput,
  PaginatedResponse,
  QueryConfig 
} from '@/types';

export const propertyService = {
  getProperties: async (config: QueryConfig): Promise<PaginatedResponse<Property>> => {
    const { data } = await apiClient.get('/properties', { params: config });
    return data;
  },

  getProperty: async (id: string): Promise<Property> => {
    const { data } = await apiClient.get(`/properties/${id}`);
    return data;
  },

  createProperty: async (input: CreatePropertyInput): Promise<Property> => {
    const { data } = await apiClient.post('/properties', input);
    return data;
  },

  updateProperty: async (id: string, input: UpdatePropertyInput): Promise<Property> => {
    const { data } = await apiClient.patch(`/properties/${id}`, input);
    return data;
  },

  deleteProperty: async (id: string): Promise<void> => {
    await apiClient.delete(`/properties/${id}`);
  },
}; 