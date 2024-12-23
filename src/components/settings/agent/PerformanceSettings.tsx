import {
  Card,
  CardBody,
  Progress,
  Chip,
} from "@nextui-org/react";
import { 
  ChartBarIcon,
} from "@heroicons/react/24/outline";
import { useState } from "react";

interface PerformanceMetrics {
  leadsAssigned: number;
  leadsClosed: number;
  tasksCompleted: number;
  avgResponseTime: number;
  clientSatisfaction: number;
  monthlyTarget: number;
}

export default function PerformanceSettings() {
  const [metrics] = useState<PerformanceMetrics>({
    leadsAssigned: 45,
    leadsClosed: 32,
    tasksCompleted: 128,
    avgResponseTime: 2.5,
    clientSatisfaction: 92,
    monthlyTarget: 85,
  });

  return (
    <div className="space-y-6">
      <Card className="bg-background/70 backdrop-blur-md">
        <CardBody>
          <h3 className="text-md font-semibold mb-4">Performance Overview</h3>
          <div className="space-y-6">
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm">Lead Conversion Rate</span>
                <span className="text-sm font-semibold">
                  {((metrics.leadsClosed / metrics.leadsAssigned) * 100).toFixed(1)}%
                </span>
              </div>
              <Progress 
                value={(metrics.leadsClosed / metrics.leadsAssigned) * 100}
                color="success"
                showValueLabel={true}
              />
            </div>

            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm">Client Satisfaction</span>
                <span className="text-sm font-semibold">{metrics.clientSatisfaction}%</span>
              </div>
              <Progress 
                value={metrics.clientSatisfaction}
                color="primary"
                showValueLabel={true}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Card>
                <CardBody>
                  <p className="text-sm text-gray-400">Tasks Completed</p>
                  <p className="text-2xl font-bold">{metrics.tasksCompleted}</p>
                </CardBody>
              </Card>

              <Card>
                <CardBody>
                  <p className="text-sm text-gray-400">Avg Response Time</p>
                  <p className="text-2xl font-bold">{metrics.avgResponseTime}h</p>
                </CardBody>
              </Card>
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  );
} 