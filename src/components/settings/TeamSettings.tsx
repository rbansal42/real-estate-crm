"use client";

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
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/react";
import { 
  UserGroupIcon,
  PlusIcon,
  EllipsisVerticalIcon,
  PencilIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import { useState } from "react";

interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: string;
  status: string;
  lastActive: string;
}

export default function TeamSettings() {
  const [members] = useState<TeamMember[]>([
    {
      id: "1",
      name: "John Doe",
      email: "john@propdekho.com",
      role: "Admin",
      status: "active",
      lastActive: "2024-03-20 15:30:00",
    },
    {
      id: "2",
      name: "Jane Smith",
      email: "jane@propdekho.com",
      role: "Manager",
      status: "active",
      lastActive: "2024-03-20 14:45:00",
    },
  ]);

  const statusColorMap: Record<string, "success" | "danger" | "warning"> = {
    active: "success",
    inactive: "danger",
    pending: "warning",
  };

  const columns = [
    { name: "MEMBER", uid: "member" },
    { name: "ROLE", uid: "role" },
    { name: "STATUS", uid: "status" },
    { name: "LAST ACTIVE", uid: "lastActive" },
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
      case "role":
        return <div className="capitalize">{member.role}</div>;
      case "status":
        return (
          <Chip
            color={statusColorMap[member.status as keyof typeof statusColorMap]}
            size="sm"
            variant="flat"
          >
            {member.status}
          </Chip>
        );
      case "lastActive":
        return <div>{member.lastActive}</div>;
      case "actions":
        return (
          <div className="flex justify-end">
            <Dropdown>
              <DropdownTrigger>
                <Button isIconOnly variant="light">
                  <EllipsisVerticalIcon className="w-5 h-5" />
                </Button>
              </DropdownTrigger>
              <DropdownMenu>
                <DropdownItem
                  key="edit"
                  startContent={<PencilIcon className="w-4 h-4" />}
                >
                  Edit
                </DropdownItem>
                <DropdownItem
                  key="delete"
                  startContent={<TrashIcon className="w-4 h-4" />}
                  className="text-danger"
                  color="danger"
                >
                  Delete
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6 p-4">
      <div className="flex items-center gap-4">
        <UserGroupIcon className="w-8 h-8" />
        <div>
          <h2 className="text-lg font-semibold">Team Management</h2>
          <p className="text-sm text-gray-400">
            Manage team members and their roles
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