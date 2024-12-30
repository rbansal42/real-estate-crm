import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { TeamMember } from '@/lib/types/team';
import { dummyTeamMembers } from '@/constants/dummy-data/team';
import { logger } from '@/lib/logger';

// In a real app, these would be API calls
const fetchTeamMembers = async (): Promise<TeamMember[]> => {
  logger.info('Fetching team members');
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  return dummyTeamMembers;
};

const addTeamMember = async (member: Omit<TeamMember, 'id' | 'createdAt' | 'updatedAt'>): Promise<TeamMember> => {
  logger.info('Adding team member', { member });
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  const newMember: TeamMember = {
    ...member,
    id: Math.random().toString(36).substr(2, 9),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  return newMember;
};

const updateTeamMember = async (member: Partial<TeamMember> & { id: string }): Promise<TeamMember> => {
  logger.info('Updating team member', { member });
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  const existingMember = dummyTeamMembers.find(m => m.id === member.id);
  if (!existingMember) {
    throw new Error('Team member not found');
  }
  const updatedMember: TeamMember = {
    ...existingMember,
    ...member,
    updatedAt: new Date().toISOString(),
  };
  return updatedMember;
};

const deleteTeamMember = async (id: string): Promise<void> => {
  logger.info('Deleting team member', { id });
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
};

export function useTeamData() {
  const queryClient = useQueryClient();

  const { data: team, isLoading, error } = useQuery({
    queryKey: ['team'],
    queryFn: fetchTeamMembers,
  });

  const addTeamMemberMutation = useMutation({
    mutationFn: addTeamMember,
    onSuccess: (newMember) => {
      queryClient.setQueryData(['team'], (old: TeamMember[] = []) => [...old, newMember]);
    },
  });

  const updateTeamMemberMutation = useMutation({
    mutationFn: updateTeamMember,
    onSuccess: (updatedMember) => {
      queryClient.setQueryData(['team'], (old: TeamMember[] = []) => 
        old.map(member => member.id === updatedMember.id ? updatedMember : member)
      );
    },
  });

  const deleteTeamMemberMutation = useMutation({
    mutationFn: deleteTeamMember,
    onSuccess: (_, id) => {
      queryClient.setQueryData(['team'], (old: TeamMember[] = []) => 
        old.filter(member => member.id !== id)
      );
    },
  });

  return {
    team,
    isLoading,
    error,
    addTeamMember: addTeamMemberMutation.mutate,
    updateTeamMember: updateTeamMemberMutation.mutate,
    deleteTeamMember: deleteTeamMemberMutation.mutate,
    isAddingTeamMember: addTeamMemberMutation.isPending,
    isUpdatingTeamMember: updateTeamMemberMutation.isPending,
    isDeletingTeamMember: deleteTeamMemberMutation.isPending,
  };
} 