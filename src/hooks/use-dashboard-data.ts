import { useQuery } from '@tanstack/react-query';
import { useLeadsData } from './use-leads-data';
import { usePropertyData } from './use-property-data';
import { useTeamData } from './use-team-data';
import { logger } from '@/lib/logger';

export interface DashboardMetrics {
  totalLeads: number;
  activeProperties: number;
  teamMembers: number;
  conversionRate: number;
  leadTrends: Array<{
    date: string;
    leads: number;
  }>;
  propertyTrends: Array<{
    date: string;
    properties: number;
  }>;
  recentActivity: Array<{
    id: string;
    type: 'lead' | 'property' | 'team';
    action: string;
    description: string;
    timestamp: string;
  }>;
  teamPerformance: Array<{
    member: string;
    leads: number;
    conversions: number;
    properties: number;
  }>;
  propertyStatus: Array<{
    status: string;
    count: number;
  }>;
}

export function useDashboardData() {
  const { data: leads = [] } = useLeadsData();
  const { data: properties = [] } = usePropertyData();
  const { data: team = [] } = useTeamData();

  return useQuery({
    queryKey: ['dashboard'],
    queryFn: async () => {
      logger.info('Fetching dashboard data');

      // Calculate metrics
      const totalLeads = leads.length;
      const activeProperties = properties.length;
      const teamMembers = team.length;
      const conversionRate = Math.round((leads.filter(l => l.status === 'converted').length / totalLeads) * 100) || 0;

      // Generate dummy trends data
      const leadTrends = Array.from({ length: 7 }, (_, i) => ({
        date: new Date(Date.now() - (6 - i) * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        leads: Math.floor(Math.random() * 50) + 10,
      }));

      const propertyTrends = Array.from({ length: 7 }, (_, i) => ({
        date: new Date(Date.now() - (6 - i) * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        properties: Math.floor(Math.random() * 20) + 5,
      }));

      // Generate recent activity
      const recentActivity = [
        {
          id: '1',
          type: 'lead' as const,
          action: 'created',
          description: 'New lead added by John Doe',
          timestamp: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
        },
        {
          id: '2',
          type: 'property' as const,
          action: 'updated',
          description: 'Property listing updated by Jane Smith',
          timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
        },
        {
          id: '3',
          type: 'team' as const,
          action: 'joined',
          description: 'New team member joined',
          timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
        },
      ];

      // Calculate team performance
      const teamPerformance = team.map(member => ({
        member: member.name,
        leads: Math.floor(Math.random() * 30) + 5,
        conversions: Math.floor(Math.random() * 10) + 2,
        properties: Math.floor(Math.random() * 15) + 3,
      }));

      // Calculate property status distribution
      const propertyStatus = [
        { status: 'Available', count: Math.floor(Math.random() * 20) + 10 },
        { status: 'Under Contract', count: Math.floor(Math.random() * 15) + 5 },
        { status: 'Sold', count: Math.floor(Math.random() * 10) + 5 },
        { status: 'Off Market', count: Math.floor(Math.random() * 5) + 2 },
      ];

      return {
        totalLeads,
        activeProperties,
        teamMembers,
        conversionRate,
        leadTrends,
        propertyTrends,
        recentActivity,
        teamPerformance,
        propertyStatus,
      } satisfies DashboardMetrics;
    },
    refetchInterval: 5 * 60 * 1000, // Refetch every 5 minutes
  });
} 