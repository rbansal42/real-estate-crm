"use client";

import { useState } from "react";
import { Card, CardBody, Tab, Tabs } from "@nextui-org/react";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import { useAuthStore } from "@/store/useAuthStore";
import CompanySettings from "@/components/settings/CompanySettings";
import UserSettings from "@/components/settings/UserSettings";
import TeamSettings from "@/components/settings/TeamSettings";
import SecuritySettings from "@/components/settings/SecuritySettings";
import AgentSettings from "@/components/settings/agent/AgentSettings";
import type { UserRole } from "@/types/auth.types";

type SettingKey = 'company' | 'team' | 'security' | 'user' | 'manager' | 'agent';

const ROLE_SETTINGS_MAP: Record<UserRole, SettingKey[]> = {
  admin: ["company", "team", "security", "user"],
  manager: ["manager", "security", "user"],
  agent: ["agent", "security", "user"]
} as const;

export default function SettingsPage() {
  const { user } = useAuthStore();
  const [selectedTab, setSelectedTab] = useState<string>("user");
  // Ensure user exists and has a valid role
  if (!user || !ROLE_SETTINGS_MAP[user.role as UserRole]) {
    return null;
  }

  const availableSettings = ROLE_SETTINGS_MAP[user.role as UserRole];

  return (
    <DashboardLayout>
      <div className="space-y-6 p-4">
        <Tabs 
          selectedKey={selectedTab}
          onSelectionChange={(key) => setSelectedTab(key.toString())}
          aria-label="Settings tabs"
          color="primary"
          variant="underlined"
          classNames={{
            tabList: "gap-6",
            cursor: "bg-primary",
          }}
        >
          {availableSettings.includes("user") && (
            <Tab key="user" title="User Settings">
              <UserSettings />
            </Tab>
          )}
          {availableSettings.includes("company") && (
            <Tab key="company" title="Company Settings">
              <CompanySettings />
            </Tab>
          )}
          {availableSettings.includes("team") && (
            <Tab key="team" title="Team Settings">
              <TeamSettings />
            </Tab>
          )}
          {availableSettings.includes("security") && (
            <Tab key="security" title="Security">
              <SecuritySettings />
            </Tab>
          )}
          {availableSettings.includes("agent") && (
            <Tab key="agent" title="Agent Settings">
              <AgentSettings />
            </Tab>
          )}
        </Tabs>
      </div>
    </DashboardLayout>
  );
} 