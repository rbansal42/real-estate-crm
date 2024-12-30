"use client"

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Lead } from "@/lib/types/lead";
import { dummyLeads } from "@/constants/dummy-data/leads";
import { logger } from "@/lib/logger";

// In a real application, these would be API calls
const fetchLeads = async (): Promise<Lead[]> => {
  logger.info("Fetching leads");
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return dummyLeads;
};

const addLead = async (lead: Partial<Lead>): Promise<Lead> => {
  logger.info("Adding lead", { lead });
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000));
  const newLead: Lead = {
    id: Math.random().toString(36).substring(7),
    ...lead,
    createdAt: new Date(),
    updatedAt: new Date(),
  } as Lead;
  return newLead;
};

const updateLead = async (lead: Partial<Lead>): Promise<Lead> => {
  logger.info("Updating lead", { lead });
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000));
  const updatedLead: Lead = {
    ...lead,
    updatedAt: new Date(),
  } as Lead;
  return updatedLead;
};

const deleteLead = async (id: string): Promise<void> => {
  logger.info("Deleting lead", { id });
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000));
};

export function useLeadData() {
  const queryClient = useQueryClient();

  const { data: leads, isLoading } = useQuery<Lead[]>({
    queryKey: ["leads"],
    queryFn: fetchLeads,
  });

  const { mutate: addLeadMutation, isPending: isAddingLead } = useMutation({
    mutationFn: addLead,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["leads"] });
    },
  });

  const { mutate: updateLeadMutation, isPending: isUpdatingLead } = useMutation({
    mutationFn: updateLead,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["leads"] });
    },
  });

  const { mutate: deleteLeadMutation, isPending: isDeletingLead } = useMutation({
    mutationFn: deleteLead,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["leads"] });
    },
  });

  return {
    leads,
    isLoading,
    addLead: addLeadMutation,
    updateLead: updateLeadMutation,
    deleteLead: deleteLeadMutation,
    isAddingLead,
    isUpdatingLead,
    isDeletingLead,
  };
} 