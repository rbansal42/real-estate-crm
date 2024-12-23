"use client";

import { Card, CardBody, Tab, Tabs } from "@nextui-org/react";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import { useAuthStore } from "@/store/useAuthStore";
import CompanySettings from "@/components/settings/CompanySettings";
import UserSettings from "@/components/settings/UserSettings";
import TeamSettings from "@/components/settings/TeamSettings";
import SecuritySettings from "@/components/settings/SecuritySettings";

const ROLE_SETTINGS_MAP = {
  admin: ["company", "team", "security", "user", "manager"],
  manager: ["manager", "security", "user"],
  agent: ["agent", "security", "user"],
};

export default function SettingsPage() {
  const { user } = useAuthStore();
  const availableSettings = ROLE_SETTINGS_MAP[user?.role || "agent"];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Settings</h1>
        </div>

        <Card className="bg-background/70 backdrop-blur-md">
          <CardBody>
            <Tabs 
              aria-label="Settings tabs" 
              color="primary" 
              variant="underlined"
              classNames={{
                tabList: "gap-6",
                cursor: "bg-primary",
              }}
            >
              {availableSettings.includes("company") && (
                <Tab 
                  key="company" 
                  title="Company"
                  className="px-0"
                >
                  <CompanySettings />
                </Tab>
              )}
              {availableSettings.includes("team") && (
                <Tab 
                  key="team" 
                  title="Team Management"
                  className="px-0"
                >
                  <TeamSettings />
                </Tab>
              )}
              {availableSettings.includes("security") && (
                <Tab 
                  key="security" 
                  title="Security"
                  className="px-0"
                >
                  <SecuritySettings />
                </Tab>
              )}
              {availableSettings.includes("user") && (
                <Tab 
                  key="user" 
                  title="User Profile"
                  className="px-0"
                >
                  <UserSettings />
                </Tab>
              )}
            </Tabs>
          </CardBody>
        </Card>
      </div>
    </DashboardLayout>
  );
} 