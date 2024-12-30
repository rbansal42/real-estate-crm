import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Property } from '@/lib/types/property';
import { dummyProperties } from '@/constants/dummy-data/properties';
import { logger } from '@/lib/logger';

// In a real app, these would be API calls
const fetchProperties = async (): Promise<Property[]> => {
  logger.info('Fetching properties');
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  return dummyProperties;
};

const addProperty = async (property: Omit<Property, 'id' | 'createdAt' | 'updatedAt'>): Promise<Property> => {
  logger.info('Adding property', { property });
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  const newProperty: Property = {
    ...property,
    id: Math.random().toString(36).substr(2, 9),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  return newProperty;
};

const updateProperty = async (property: Partial<Property> & { id: string }): Promise<Property> => {
  logger.info('Updating property', { property });
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  const existingProperty = dummyProperties.find(p => p.id === property.id);
  if (!existingProperty) {
    throw new Error('Property not found');
  }
  const updatedProperty: Property = {
    ...existingProperty,
    ...property,
    updatedAt: new Date().toISOString(),
  };
  return updatedProperty;
};

const deleteProperty = async (id: string): Promise<void> => {
  logger.info('Deleting property', { id });
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
};

export function usePropertyData() {
  const queryClient = useQueryClient();

  const { data: properties, isLoading, error } = useQuery({
    queryKey: ['properties'],
    queryFn: fetchProperties,
  });

  const addPropertyMutation = useMutation({
    mutationFn: addProperty,
    onSuccess: (newProperty) => {
      queryClient.setQueryData(['properties'], (old: Property[] = []) => [...old, newProperty]);
    },
  });

  const updatePropertyMutation = useMutation({
    mutationFn: updateProperty,
    onSuccess: (updatedProperty) => {
      queryClient.setQueryData(['properties'], (old: Property[] = []) => 
        old.map(property => property.id === updatedProperty.id ? updatedProperty : property)
      );
    },
  });

  const deletePropertyMutation = useMutation({
    mutationFn: deleteProperty,
    onSuccess: (_, id) => {
      queryClient.setQueryData(['properties'], (old: Property[] = []) => 
        old.filter(property => property.id !== id)
      );
    },
  });

  return {
    properties,
    isLoading,
    error,
    addProperty: addPropertyMutation.mutate,
    updateProperty: updatePropertyMutation.mutate,
    deleteProperty: deletePropertyMutation.mutate,
    isAddingProperty: addPropertyMutation.isPending,
    isUpdatingProperty: updatePropertyMutation.isPending,
    isDeletingProperty: deletePropertyMutation.isPending,
  };
} 