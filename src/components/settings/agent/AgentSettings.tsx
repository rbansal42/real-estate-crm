import { Tabs, Tab } from "@nextui-org/react";
import ProfileSettings from "./ProfileSettings";
import LeadManagementSettings from "./LeadManagementSettings";
import TaskManagementSettings from "./TaskManagementSettings";
import PerformanceSettings from "./PerformanceSettings";

export default function AgentSettings() {
  return (
    <div className="space-y-6">
      <Tabs 
        aria-label="Agent settings tabs" 
        color="primary" 
        variant="underlined"
        classNames={{
          tabList: "gap-6",
          cursor: "bg-primary",
        }}
      >
        <Tab 
          key="profile" 
          title="Profile"
          className="px-0"
        >
          <ProfileSettings />
        </Tab>
        <Tab 
          key="leads" 
          title="Lead Management"
          className="px-0"
        >
          <LeadManagementSettings />
        </Tab>
        <Tab 
          key="tasks" 
          title="Task Management"
          className="px-0"
        >
          <TaskManagementSettings />
        </Tab>
        <Tab 
          key="performance" 
          title="Performance"
          className="px-0"
        >
          <PerformanceSettings />
        </Tab>
      </Tabs>
    </div>
  );
} 