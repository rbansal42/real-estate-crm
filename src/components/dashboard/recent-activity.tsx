'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Building2, UserPlus, Users } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

interface RecentActivity {
  id: string;
  type: 'lead' | 'property' | 'team';
  action: string;
  description: string;
  timestamp: string;
}

interface RecentActivityProps {
  activities: RecentActivity[];
}

export function RecentActivity({ activities }: RecentActivityProps) {
  const getIcon = (type: RecentActivity['type']) => {
    switch (type) {
      case 'lead':
        return <UserPlus className="h-4 w-4" />;
      case 'property':
        return <Building2 className="h-4 w-4" />;
      case 'team':
        return <Users className="h-4 w-4" />;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-sm font-medium">Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-8">
          {activities.map((activity) => (
            <div key={activity.id} className="flex items-start gap-4">
              <div className="rounded-full border p-2">
                {getIcon(activity.type)}
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium leading-none">
                  {activity.description}
                </p>
                <p className="text-sm text-muted-foreground">
                  {formatDistanceToNow(new Date(activity.timestamp), { addSuffix: true })}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
} 