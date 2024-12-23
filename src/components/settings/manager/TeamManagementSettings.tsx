import {
  Card,
  CardBody,
  Button,
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
  User,
  Chip,
  Progress,
} from "@nextui-org/react";
import { 
  UserGroupIcon,
  PlusIcon,
} from "@heroicons/react/24/outline";
import { useState } from "react";

interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: string;
  activeLeads: number;
  performance: number;
  status: string;
}

export default function TeamManagementSettings() {
  const [members] = useState<TeamMember[]>([
    {
      id: "1",
      name: "John Doe",
      email: "john@propdekho.com",
      role: "Sales Agent",
      activeLeads: 12,
      performance: 85,
      status: "active",
    },
    {
      id: "2",
      name: "Jane Smith",
      email: "jane@propdekho.com",
      role: "Sales Agent",
      activeLeads: 8,
      performance: 92,
      status: "active",
    },
  ]);

  const columns = [
    { name: "MEMBER", uid: "member" },
    { name: "ACTIVE LEADS", uid: "activeLeads" },
    { name: "PERFORMANCE", uid: "performance" },
    { name: "STATUS", uid: "status" },
    { name: "ACTIONS", uid: "actions" },
  ];

  const renderCell = (member: TeamMember, columnKey: React.Key) => {
    switch (columnKey) {
      case "member":
        return (
          <User
            name={member.name}
            description={member.email}
            avatarProps={{
              radius: "full",
              src: `https://i.pravatar.cc/150?u=${member.id}`,
            }}
          />
        );
      case "activeLeads":
        return (
          <Chip color="primary" variant="flat">
            {member.activeLeads} Leads
          </Chip>
        );
      case "performance":
        return (
          <Progress
            value={member.performance}
            color="success"
            className="max-w-md"
            showValueLabel={true}
          />
        );
      case "status":
        return (
          <Chip
            color={member.status === "active" ? "success" : "danger"}
            variant="flat"
          >
            {member.status}
          </Chip>
        );
      case "actions":
        return (
          <div className="flex gap-2">
            <Button size="sm">Assign Leads</Button>
            <Button size="sm" color="danger" variant="flat">
              Remove
            </Button>
          </div>
        );
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <UserGroupIcon className="w-8 h-8" />
        <div>
          <h2 className="text-lg font-semibold">Team Management</h2>
          <p className="text-sm text-gray-400">
            Manage your team members and their assignments
          </p>
        </div>
      </div>

      <Card className="bg-background/70 backdrop-blur-md">
        <CardBody>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-md font-semibold">Team Members</h3>
            <Button 
              color="primary" 
              startContent={<PlusIcon className="w-4 h-4" />}
            >
              Add Member
            </Button>
          </div>
          
          <Table aria-label="Team members table">
            <TableHeader columns={columns}>
              {(column) => (
                <TableColumn key={column.uid}>
                  {column.name}
                </TableColumn>
              )}
            </TableHeader>
            <TableBody items={members}>
              {(member) => (
                <TableRow key={member.id}>
                  {(columnKey) => (
                    <TableCell>
                      {renderCell(member, columnKey)}
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