import {
  Card,
  CardBody,
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
  Chip,
  Button,
  User,
} from "@nextui-org/react";
import { 
  UserGroupIcon,
  CalendarIcon,
  ChatBubbleLeftIcon,
} from "@heroicons/react/24/outline";
import { useState } from "react";

interface Lead {
  id: string;
  name: string;
  email: string;
  status: string;
  lastContact: string;
  nextFollowup: string;
  source: string;
}

export default function LeadManagementSettings() {
  const [leads] = useState<Lead[]>([
    {
      id: "1",
      name: "Alice Brown",
      email: "alice@example.com",
      status: "Meeting Scheduled",
      lastContact: "2024-03-20",
      nextFollowup: "2024-03-25",
      source: "Website",
    },
    {
      id: "2",
      name: "Bob Wilson",
      email: "bob@example.com",
      status: "Follow Up",
      lastContact: "2024-03-19",
      nextFollowup: "2024-03-22",
      source: "Referral",
    },
  ]);

  const statusColorMap = {
    "Meeting Scheduled": "success",
    "Follow Up": "warning",
    "Not Interested": "danger",
  };

  const columns = [
    { name: "LEAD", uid: "lead" },
    { name: "STATUS", uid: "status" },
    { name: "LAST CONTACT", uid: "lastContact" },
    { name: "NEXT FOLLOWUP", uid: "nextFollowup" },
    { name: "ACTIONS", uid: "actions" },
  ];

  const renderCell = (lead: Lead, columnKey: React.Key) => {
    switch (columnKey) {
      case "lead":
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
      case "status":
        return (
          <Chip
            color={statusColorMap[lead.status as keyof typeof statusColorMap]}
            variant="flat"
          >
            {lead.status}
          </Chip>
        );
      case "lastContact":
        return lead.lastContact;
      case "nextFollowup":
        return lead.nextFollowup;
      case "actions":
        return (
          <div className="flex gap-2">
            <Button 
              isIconOnly 
              size="sm"
              variant="flat"
              startContent={<CalendarIcon className="w-4 h-4" />}
            />
            <Button 
              isIconOnly 
              size="sm"
              variant="flat"
              startContent={<ChatBubbleLeftIcon className="w-4 h-4" />}
            />
          </div>
        );
    }
  };

  return (
    <div className="space-y-6">
      <Card className="bg-background/70 backdrop-blur-md">
        <CardBody>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-md font-semibold">Active Leads</h3>
          </div>
          
          <Table aria-label="Active leads table">
            <TableHeader columns={columns}>
              {(column) => (
                <TableColumn key={column.uid}>
                  {column.name}
                </TableColumn>
              )}
            </TableHeader>
            <TableBody items={leads}>
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