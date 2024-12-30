import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Lead } from '@/lib/types/lead';
import { dummyLeads } from '@/constants/dummy-data/leads';
import { logger } from '@/lib/logger';

// In a real app, these would be API calls
const fetchLeads = async (): Promise<Lead[]> => {
  logger.info('Fetching leads');
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  return dummyLeads;
};

const addLead = async (lead: Omit<Lead, 'id' | 'createdAt' | 'updatedAt'>): Promise<Lead> => {
  logger.info('Adding lead', { lead });
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  const newLead: Lead = {
    ...lead,
    id: Math.random().toString(36).substr(2, 9),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  return newLead;
};

const updateLead = async (lead: Partial<Lead> & { id: string }): Promise<Lead> => {
  logger.info('Updating lead', { lead });
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  const existingLead = dummyLeads.find((l: Lead) => l.id === lead.id);
  if (!existingLead) {
    throw new Error('Lead not found');
  }
  const updatedLead: Lead = {
    ...existingLead,
    ...lead,
    updatedAt: new Date().toISOString(),
  };
  return updatedLead;
};

const deleteLead = async (id: string): Promise<void> => {
  logger.info('Deleting lead', { id });
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
};

export function useLeadsData() {
  const queryClient = useQueryClient();

  const { data: leads, isLoading, error } = useQuery({
    queryKey: ['leads'],
    queryFn: fetchLeads,
  });

  const addLeadMutation = useMutation({
    mutationFn: addLead,
    onSuccess: (newLead) => {
      queryClient.setQueryData(['leads'], (old: Lead[] = []) => [...old, newLead]);
    },
  });

  const updateLeadMutation = useMutation({
    mutationFn: updateLead,
    onSuccess: (updatedLead) => {
      queryClient.setQueryData(['leads'], (old: Lead[] = []) => 
        old.map(lead => lead.id === updatedLead.id ? updatedLead : lead)
      );
    },
  });

  const deleteLeadMutation = useMutation({
    mutationFn: deleteLead,
    onSuccess: (_, id) => {
      queryClient.setQueryData(['leads'], (old: Lead[] = []) => 
        old.filter(lead => lead.id !== id)
      );
    },
  });

  return {
    leads,
    isLoading,
    error,
    addLead: addLeadMutation.mutate,
    updateLead: updateLeadMutation.mutate,
    deleteLead: deleteLeadMutation.mutate,
    isAddingLead: addLeadMutation.isPending,
    isUpdatingLead: updateLeadMutation.isPending,
    isDeletingLead: deleteLeadMutation.isPending,
  };
} 