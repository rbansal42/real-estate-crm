import {
  Card,
  CardBody,
  Switch,
  Select,
  SelectItem,
} from "@nextui-org/react";
import { useState } from "react";

export default function NotificationSettings() {
  const [settings, setSettings] = useState({
    leadAssignment: true,
    propertyUpdates: true,
    teamPerformance: true,
    dailyDigest: false,
    emailNotifications: true,
    pushNotifications: true,
  });

  const [digestFrequency, setDigestFrequency] = useState("daily");

  return (
    <div className="space-y-6">
      <Card className="bg-background/70 backdrop-blur-md">
        <CardBody>
          <h3 className="text-md font-semibold mb-4">Team Notifications</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="font-medium">Lead Assignment</p>
                <p className="text-sm text-gray-400">
                  Get notified when new leads are assigned to your team
                </p>
              </div>
              <Switch 
                isSelected={settings.leadAssignment}
                onValueChange={(value) => 
                  setSettings({...settings, leadAssignment: value})
                }
              />
            </div>

            <div className="flex justify-between items-center">
              <div>
                <p className="font-medium">Property Updates</p>
                <p className="text-sm text-gray-400">
                  Notifications for property status changes
                </p>
              </div>
              <Switch 
                isSelected={settings.propertyUpdates}
                onValueChange={(value) => 
                  setSettings({...settings, propertyUpdates: value})
                }
              />
            </div>

            <div className="flex justify-between items-center">
              <div>
                <p className="font-medium">Team Performance</p>
                <p className="text-sm text-gray-400">
                  Get updates on team performance metrics
                </p>
              </div>
              <Switch 
                isSelected={settings.teamPerformance}
                onValueChange={(value) => 
                  setSettings({...settings, teamPerformance: value})
                }
              />
            </div>

            <div className="flex justify-between items-center">
              <div>
                <p className="font-medium">Daily Digest</p>
                <p className="text-sm text-gray-400">
                  Receive a summary of daily activities
                </p>
              </div>
              <div className="flex items-center gap-4">
                <Switch 
                  isSelected={settings.dailyDigest}
                  onValueChange={(value) => 
                    setSettings({...settings, dailyDigest: value})
                  }
                />
                {settings.dailyDigest && (
                  <Select
                    selectedKeys={[digestFrequency]}
                    onChange={(e) => setDigestFrequency(e.target.value)}
                    className="w-32"
                  >
                    <SelectItem key="daily">Daily</SelectItem>
                    <SelectItem key="weekly">Weekly</SelectItem>
                    <SelectItem key="monthly">Monthly</SelectItem>
                  </Select>
                )}
              </div>
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  );
} 