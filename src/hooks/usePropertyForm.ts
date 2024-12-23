import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { createPropertySchema } from '@/schemas/property.schema';
import type { CreatePropertyInput } from '@/types';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { propertyService } from '@/services/property.service';

export const usePropertyForm = () => {
  const queryClient = useQueryClient();
  
  const form = useForm<CreatePropertyInput>({
    resolver: zodResolver(createPropertySchema),
    defaultValues: {
      status: 'available',
      specifications: {
        bedrooms: 0,
        bathrooms: 0,
        area: 0,
        parking: 0,
      },
    },
  });

  const createProperty = useMutation({
    mutationFn: propertyService.createProperty,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['properties'] });
    },
  });

  return {
    form,
    isSubmitting: createProperty.isPending,
    submit: createProperty.mutate,
  };
}; 