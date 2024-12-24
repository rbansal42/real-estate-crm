import { Tabs, Tab } from "@nextui-org/react";
import TeamManagementSettings from "./TeamManagementSettings";
import LeadManagementSettings from "./LeadManagementSettings";
import PropertyManagementSettings from "./PropertyManagementSettings";
import NotificationSettings from "./NotificationSettings";

export default function ManagerSettings() {
  return (
    <div className="space-y-6">
      <Tabs 
        aria-label="Manager settings tabs" 
        color="primary" 
        variant="underlined"
        classNames={{
          tabList: "gap-6",
          cursor: "bg-primary",
        }}
      >
        <Tab 
          key="team" 
          title="Team Management"
          className="px-0"
        >
          <TeamManagementSettings />
        </Tab>
        <Tab 
          key="leads" 
          title="Lead Management"
          className="px-0"
        >
          <LeadManagementSettings />
        </Tab>
        <Tab 
          key="properties" 
          title="Property Management"
          className="px-0"
        >
          <PropertyManagementSettings />
        </Tab>
        <Tab 
          key="notifications" 
          title="Notifications"
          className="px-0"
        >
          <NotificationSettings />
        </Tab>
      </Tabs>
    </div>
  );
} 