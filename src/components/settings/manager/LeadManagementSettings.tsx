import {
  Card,
  CardBody,
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
  User,
  Chip,
  Progress,
  Button,
} from "@nextui-org/react";
import { 
  UserGroupIcon,
  ArrowPathIcon,
  ClockIcon,
} from "@heroicons/react/24/outline";
import { useState } from "react";

interface TeamLead {
  id: string;
  name: string;
  email: string;
  activeLeads: number;
  convertedLeads: number;
  performance: number;
}

export default function LeadManagementSettings() {
  const [teamLeads] = useState<TeamLead[]>([
    {
      id: "1",
      name: "John Doe",
      email: "john@propdekho.com",
      activeLeads: 12,
      convertedLeads: 45,
      performance: 85,
    },
    {
      id: "2",
      name: "Jane Smith",
      email: "jane@propdekho.com",
      activeLeads: 8,
      convertedLeads: 32,
      performance: 92,
    },
  ]);

  const columns = [
    { name: "TEAM MEMBER", uid: "member" },
    { name: "ACTIVE LEADS", uid: "activeLeads" },
    { name: "CONVERTED", uid: "convertedLeads" },
    { name: "PERFORMANCE", uid: "performance" },
    { name: "ACTIONS", uid: "actions" },
  ];

  const renderCell = (lead: TeamLead, columnKey: React.Key) => {
    switch (columnKey) {
      case "member":
        return (
          <User
            name={lead.name}
            description={lead.email}
            avatarProps={{
              radius: "full",
              src: `https://i.pravatar.cc/150?u=${lead.id}`,
            }}
          />
        );
      case "activeLeads":
        return (
          <Chip color="primary" variant="flat">
            {lead.activeLeads} Active
          </Chip>
        );
      case "convertedLeads":
        return lead.convertedLeads;
      case "performance":
        return (
          <Progress
            value={lead.performance}
            color="success"
            className="max-w-md"
            showValueLabel={true}
          />
        );
      case "actions":
        return (
          <div className="flex gap-2">
            <Button size="sm">Reassign</Button>
            <Button size="sm" color="primary" variant="flat">
              View Details
            </Button>
          </div>
        );
    }
  };

  return (
    <div className="space-y-6">
      <Card className="bg-background/70 backdrop-blur-md">
        <CardBody>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-md font-semibold">Lead Distribution</h3>
            <Button 
              color="primary"
              startContent={<ArrowPathIcon className="w-4 h-4" />}
            >
              Redistribute Leads
            </Button>
          </div>
          
          <Table aria-label="Team lead performance">
            <TableHeader columns={columns}>
              {(column) => (
                <TableColumn key={column.uid}>
                  {column.name}
                </TableColumn>
              )}
            </TableHeader>
            <TableBody items={teamLeads}>
              {(lead) => (
                <TableRow key={lead.id}>
                  {(columnKey) => (
                    <TableCell>
                      {renderCell(lead, columnKey)}
                    </TableCell>
                  )}
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardBody>
      </Card>
    </div>
  );
} 