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
  Tooltip,
  User,
} from "@nextui-org/react";
import { 
  EllipsisVerticalIcon, 
  PencilIcon, 
  TrashIcon, 
  EyeIcon,
  PhotoIcon,
  ArrowUpIcon,
  ArrowDownIcon,
} from "@heroicons/react/24/outline";
import { useProperties } from "@/hooks/useProperties";
import { useState, useMemo } from "react";
import { Property } from "@/types";
import Image from "next/image";

const statusColorMap = {
  available: "success",
  sold: "danger",
  rented: "warning",
  pending: "primary",
};

export default function PropertyTable() {
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({
    column: "createdAt",
    direction: "descending",
  });
  const [selectedKeys, setSelectedKeys] = useState<Selection>(new Set([]));

  const { data, isLoading } = useProperties({
    page,
    limit: rowsPerPage,
    sort: sortDescriptor.column,
    order: sortDescriptor.direction,
  });

  const properties = data?.items || [];
  const total = data?.total || 0;

  const sortedProperties = useMemo(() => {
    return [...properties].sort((a, b) => {
      const first = a[sortDescriptor.column as keyof Property];
      const second = b[sortDescriptor.column as keyof Property];
      if (sortDescriptor.direction === "ascending") {
        return first < second ? -1 : 1;
      } else {
        return first > second ? -1 : 1;
      }
    });
  }, [properties, sortDescriptor]);

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

  const renderCell = (property: Property, columnKey: React.Key) => {
    switch (columnKey) {
      case "title":
        return (
          <User
            avatarProps={{
              src: property.images[0],
              icon: <PhotoIcon className="w-4 h-4" />,
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
                <Button isIconOnly variant="light">
                  <EllipsisVerticalIcon className="w-5 h-5" />
                </Button>
              </DropdownTrigger>
              <DropdownMenu>
                <DropdownItem startContent={<EyeIcon className="w-4 h-4" />}>
                  View Details
                </DropdownItem>
                <DropdownItem startContent={<PencilIcon className="w-4 h-4" />}>
                  Edit
                </DropdownItem>
                <DropdownItem 
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
        isLoading={isLoading}
        loadingContent={<div>Loading properties...</div>}
      >
        {(property) => (
          <TableRow key={property.id}>
            {(columnKey) => (
              <TableCell>{renderCell(property, columnKey)}</TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
} 