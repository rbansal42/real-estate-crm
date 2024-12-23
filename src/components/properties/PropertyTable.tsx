"use client";

import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
  Button,
  Chip,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Pagination,
  Selection,
  SortDescriptor,
  User,
} from "@nextui-org/react";
import { 
  EllipsisVerticalIcon, 
  PencilIcon, 
  TrashIcon, 
  EyeIcon,
  PhotoIcon,
} from "@heroicons/react/24/outline";
import { useState, useMemo } from "react";
import { Property } from "@/types";

const statusColorMap: Record<string, "success" | "danger" | "warning" | "primary"> = {
  available: "success",
  sold: "danger",
  rented: "warning",
  pending: "primary",
};

type ColumnKey = "title" | "type" | "location" | "price" | "status" | "actions";

interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  limit: number;
}

interface PropertyTableProps {
  properties: Property[];
}

export default function PropertyTable({ properties }: PropertyTableProps) {
  const [selectedKeys, setSelectedKeys] = useState<Selection>(new Set([]));
  const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({
    column: "title",
    direction: "ascending",
  });
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const sortedProperties = useMemo(() => {
    return [...properties].sort((a, b) => {
      const first = a[sortDescriptor.column as keyof Property];
      const second = b[sortDescriptor.column as keyof Property];
      const cmp = first < second ? -1 : 1;

      return sortDescriptor.direction === "descending" ? -cmp : cmp;
    });
  }, [sortDescriptor, properties]);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumSignificantDigits: 3,
    }).format(price);
  };

  const columns = [
    { name: "PROPERTY", uid: "title", sortable: true },
    { name: "TYPE", uid: "type", sortable: true },
    { name: "LOCATION", uid: "location", sortable: true },
    { name: "PRICE", uid: "price", sortable: true },
    { name: "STATUS", uid: "status", sortable: true },
    { name: "ACTIONS", uid: "actions" },
  ];

  const renderCell = (property: Property, columnKey: ColumnKey) => {
    switch (columnKey) {
      case "title":
        return (
          <User
            avatarProps={{
              src: property.images[0],
              icon: <PhotoIcon className="w-4 h-4" />,
              alt: property.title,
            }}
            name={property.title}
            description={`${property.specifications.bedrooms} beds • ${property.specifications.bathrooms} baths`}
          />
        );
      case "type":
        return property.type.charAt(0).toUpperCase() + property.type.slice(1);
      case "location":
        return `${property.location.city}, ${property.location.state}`;
      case "price":
        return formatPrice(property.price);
      case "status":
        return (
          <Chip
            color={statusColorMap[property.status]}
            variant="flat"
            size="sm"
          >
            {property.status.toUpperCase()}
          </Chip>
        );
      case "actions":
        return (
          <div className="flex justify-end">
            <Dropdown>
              <DropdownTrigger>
                <Button isIconOnly variant="light" aria-label="More actions">
                  <EllipsisVerticalIcon className="w-5 h-5" />
                </Button>
              </DropdownTrigger>
              <DropdownMenu aria-label="Property actions">
                <DropdownItem key="view" startContent={<EyeIcon className="w-4 h-4" />}>
                  View Details
                </DropdownItem>
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
    }
  };

  const handleRowsPerPageChange = (value: number) => {
    setRowsPerPage(value);
  };

  return (
    <div className="space-y-4">
      <Table
        aria-label="Properties table"
        isHeaderSticky
        selectionMode="multiple"
        selectedKeys={selectedKeys}
        onSelectionChange={setSelectedKeys}
        sortDescriptor={sortDescriptor}
        onSortChange={setSortDescriptor}
        classNames={{
          wrapper: "max-h-[600px]",
        }}
      >
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn 
              key={column.uid}
              align={column.uid === "actions" ? "center" : "start"}
              allowsSorting={column.sortable}
            >
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody 
          items={sortedProperties}
          emptyContent={!sortedProperties.length && "No properties found"}
        >
          {(property) => (
            <TableRow key={property.id}>
              {(columnKey) => (
                <TableCell>
                  {renderCell(property, columnKey as ColumnKey)}
                </TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>

      <div className="flex justify-between items-center">
        <div className="text-small text-default-400">
          Total {properties.length} properties
        </div>
        <Pagination
          total={Math.ceil(properties.length / rowsPerPage)}
          page={1}
          onChange={() => {}}
          showControls
          classNames={{
            wrapper: "gap-2",
          }}
        />
      </div>
    </div>
  );
} 