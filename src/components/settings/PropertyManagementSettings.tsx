"use client";

import {
  Card,
  CardBody,
  Button,
  Chip,
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/react";
import { 
  PlusIcon, 
  PencilIcon, 
  TrashIcon,
  TagIcon,
  BuildingOfficeIcon,
  EllipsisVerticalIcon 
} from "@heroicons/react/24/outline";
import { useState } from "react";

interface Category {
  id: string;
  name: string;
  description: string;
  count: number;
}

type TagColor = "success" | "warning" | "primary" | "danger";

interface Tag {
  id: string;
  name: string;
  color: TagColor;
  count: number;
}

export default function PropertyManagementSettings() {
  const [categories, setCategories] = useState<Category[]>([
    { id: '1', name: 'Residential', description: 'Houses and apartments', count: 120 },
    { id: '2', name: 'Commercial', description: 'Office spaces and shops', count: 36 },
  ]);

  const [tags, setTags] = useState<Tag[]>([
    { id: '1', name: 'Under Construction', color: 'warning', count: 45 },
    { id: '2', name: 'Ready to Move', color: 'success', count: 89 },
    { id: '3', name: 'New Launch', color: 'primary', count: 22 },
  ]);

  // Following the table pattern from PropertyTable.tsx
  const categoryColumns = [
    { name: "CATEGORY", uid: "name" },
    { name: "DESCRIPTION", uid: "description" },
    { name: "PROPERTIES", uid: "count" },
    { name: "ACTIONS", uid: "actions" },
  ];

  const renderCell = (item: Category, columnKey: React.Key) => {
    switch (columnKey) {
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
                <DropdownItem key="edit" startContent={<PencilIcon className="w-4 h-4" />}>
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
        return item[columnKey as keyof Category];
    }
  };

  return (
    <div className="space-y-6 p-4">
      <div className="flex items-center gap-4">
        <BuildingOfficeIcon className="w-8 h-8" />
        <div>
          <h2 className="text-lg font-semibold">Property Management</h2>
          <p className="text-sm text-gray-400">
            Manage property categories, tags, and global settings
          </p>
        </div>
      </div>

      <Card className="bg-background/70 backdrop-blur-md">
        <CardBody>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-md font-semibold">Categories</h3>
            <Button 
              color="primary" 
              startContent={<PlusIcon className="w-4 h-4" />}
            >
              Add Category
            </Button>
          </div>
          
          <Table
            aria-label="Property categories table"
            classNames={{
              wrapper: "max-h-[400px]",
            }}
          >
            <TableHeader columns={categoryColumns}>
              {(column) => (
                <TableColumn key={column.uid}>
                  {column.name}
                </TableColumn>
              )}
            </TableHeader>
            <TableBody items={categories}>
              {(category) => (
                <TableRow key={category.id}>
                  {(columnKey) => (
                    <TableCell>{renderCell(category, columnKey)}</TableCell>
                  )}
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardBody>
      </Card>

      <Card className="bg-background/70 backdrop-blur-md">
        <CardBody>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-md font-semibold">Property Tags</h3>
            <Button 
              color="primary" 
              startContent={<TagIcon className="w-4 h-4" />}
            >
              Add Tag
            </Button>
          </div>
          
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <Chip
                key={tag.id}
                color={tag.color as any}
                variant="flat"
                onClose={() => {}}
                classNames={{
                  base: "px-3 py-1",
                }}
              >
                {tag.name} ({tag.count})
              </Chip>
            ))}
          </div>
        </CardBody>
      </Card>
    </div>
  );
} 