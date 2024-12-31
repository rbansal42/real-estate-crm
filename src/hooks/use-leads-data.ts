'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Lead } from '@/lib/types/lead';
import { dummyLeads } from '@/constants/dummy-data/leads';

// In a real application, these would be API calls
const fetchLeads = async (): Promise<Lead[]> => {
  console.log('Fetching leads...');
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return dummyLeads;
};

const addLeadToServer = async (lead: Lead): Promise<Lead> => {
  console.log('Adding lead:', lead);
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return lead;
};

const updateLeadOnServer = async (lead: Lead): Promise<Lead> => {
  console.log('Updating lead:', lead);
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return lead;
};

const deleteLeadFromServer = async (id: string): Promise<void> => {
  console.log('Deleting lead:', id);
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000));
};

export function useLeadsData() {
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery<Lead[]>({
    queryKey: ['leads'],
    queryFn: fetchLeads,
  });

  const addMutation = useMutation({
    mutationFn: addLeadToServer,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['leads'] });
    },
  });

  const updateMutation = useMutation({
    mutationFn: updateLeadOnServer,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['leads'] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteLeadFromServer,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['leads'] });
    },
  });

  return {
    data,
    isLoading,
    addLead: addMutation.mutateAsync,
    updateLead: updateMutation.mutateAsync,
    deleteLead: deleteMutation.mutateAsync,
    isAddingLead: addMutation.isPending,
    isUpdatingLead: updateMutation.isPending,
    isDeletingLead: deleteMutation.isPending,
  };
} 