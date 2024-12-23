"use client";

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
  Pagination,
  Select,
  SelectItem,
  Input,
} from "@nextui-org/react";
import { 
  ClockIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import { useState } from "react";

type ActivityColor = "success" | "warning" | "primary" | "danger";

const activityTypes: Record<string, ActivityColor> = {
  property_edit: "primary",
  system: "warning",
  lead_update: "success",
  user_action: "danger",
};

export default function AuditLogSettings() {
  const [page, setPage] = useState(1);
  const [selectedType, setSelectedType] = useState<string>("all");

  const auditLogs = [
    {
      id: 1,
      timestamp: "2024-03-20 14:30:00",
      user: "John Doe",
      action: "Updated property listing",
      type: "property_edit",
      details: "Changed price from ₹45L to ₹48L",
    },
    {
      id: 2,
      timestamp: "2024-03-20 13:15:00",
      user: "System",
      action: "Lead auto-assigned",
      type: "system",
      details: "Lead #123 assigned to Sarah Smith",
    },
  ];

  return (
    <div className="space-y-6 p-4">
      <div className="flex items-center gap-4">
        <ClockIcon className="w-8 h-8" />
        <div>
          <h2 className="text-lg font-semibold">Audit Logs</h2>
          <p className="text-sm text-gray-400">
            Track all system activities and changes
          </p>
        </div>
      </div>

      <Card className="bg-background/70 backdrop-blur-md">
        <CardBody>
          <div className="flex gap-4 mb-4">
            <Input
              placeholder="Search logs..."
              startContent={<MagnifyingGlassIcon className="w-4 h-4" />}
              className="max-w-xs"
            />
            
            <Select 
              label="Activity Type"
              selectedKeys={[selectedType]}
              onChange={(e) => setSelectedType(e.target.value)}
              className="max-w-xs"
            >
              <SelectItem key="all">All Activities</SelectItem>
              <SelectItem key="property_edit">Property Edits</SelectItem>
              <SelectItem key="lead_update">Lead Updates</SelectItem>
              <SelectItem key="user_action">User Actions</SelectItem>
              <SelectItem key="system">System Events</SelectItem>
            </Select>
          </div>

          <Table 
            aria-label="Audit logs"
            bottomContent={
              <div className="flex justify-center">
                <Pagination
                  total={10}
                  page={page}
                  onChange={setPage}
                />
              </div>
            }
          >
            <TableHeader>
              <TableColumn>TIMESTAMP</TableColumn>
              <TableColumn>USER</TableColumn>
              <TableColumn>ACTION</TableColumn>
              <TableColumn>TYPE</TableColumn>
              <TableColumn>DETAILS</TableColumn>
            </TableHeader>
            <TableBody items={auditLogs}>
              {(log) => (
                <TableRow key={log.id}>
                  <TableCell>{log.timestamp}</TableCell>
                  <TableCell>{log.user}</TableCell>
                  <TableCell>{log.action}</TableCell>
                  <TableCell>
                    <Chip
                      color={activityTypes[log.type as keyof typeof activityTypes] as ActivityColor}
                      variant="flat"
                      size="sm"
                    >
                      {log.type.replace('_', ' ').toUpperCase()}
                    </Chip>
                  </TableCell>
                  <TableCell>{log.details}</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardBody>
      </Card>
    </div>
  );
} 