import {
  Card,
  CardBody,
  Tabs,
  Tab,
} from "@nextui-org/react";
import TeamManagementSettings from "./manager/TeamManagementSettings";
import LeadManagementSettings from "./manager/LeadManagementSettings";
import PropertyManagementSettings from "./manager/PropertyManagementSettings";
import NotificationSettings from "./manager/NotificationSettings";
import ReportSettings from "./manager/ReportSettings";

export default function ManagerSettings() {
  return (
    <div className="space-y-6 p-4">
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
        <Tab 
          key="reports" 
          title="Reports"
          className="px-0"
        >
          <ReportSettings />
        </Tab>
      </Tabs>
    </div>
  );
} 