import { useQuery } from '@tanstack/react-query';
import { propertyService } from '@/services/property.service';
import type { QueryConfig } from '@/types';

export const useProperties = (config: QueryConfig = {}) => {
  return useQuery({
    queryKey: ['properties', config],
    queryFn: () => propertyService.getProperties(config),
  });
};

export const useProperty = (id: string) => {
  return useQuery({
    queryKey: ['properties', id],
    queryFn: () => propertyService.getProperty(id),
  });
}; 