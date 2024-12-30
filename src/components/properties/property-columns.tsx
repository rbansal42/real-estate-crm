"use client"

import { ColumnDef } from '@tanstack/react-table';
import { Property } from '@/lib/types/property';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { MoreHorizontal, Pencil, Trash2, Eye } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { formatCurrency, formatDate } from '@/lib/utils';

const getStatusColor = (status: Property['status']) => {
  switch (status) {
    case 'available':
      return 'bg-green-500';
    case 'sold':
      return 'bg-blue-500';
    case 'rented':
      return 'bg-purple-500';
    case 'pending':
      return 'bg-yellow-500';
    case 'off-market':
      return 'bg-gray-500';
    default:
      return 'bg-gray-500';
  }
};

const getTypeColor = (type: Property['type']) => {
  switch (type) {
    case 'apartment':
      return 'bg-indigo-500';
    case 'house':
      return 'bg-blue-500';
    case 'villa':
      return 'bg-purple-500';
    case 'plot':
      return 'bg-green-500';
    case 'commercial':
      return 'bg-orange-500';
    case 'office':
      return 'bg-yellow-500';
    default:
      return 'bg-gray-500';
  }
};

export const columns: ColumnDef<Property>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="translate-y-[2px]"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="translate-y-[2px]"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'title',
    header: 'Property',
    cell: ({ row }) => {
      const property = row.original;
      return (
        <div className="flex flex-col">
          <span className="font-medium">{property.title}</span>
          <span className="text-xs text-muted-foreground">
            {property.location.address}, {property.location.city}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: 'type',
    header: 'Type',
    cell: ({ row }) => {
      const type = row.getValue('type') as Property['type'];
      return (
        <Badge className={`${getTypeColor(type)} text-white`}>
          {type.charAt(0).toUpperCase() + type.slice(1)}
        </Badge>
      );
    },
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => {
      const status = row.getValue('status') as Property['status'];
      return (
        <Badge className={`${getStatusColor(status)} text-white`}>
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </Badge>
      );
    },
  },
  {
    accessorKey: 'pricing',
    header: 'Price',
    cell: ({ row }) => {
      const pricing = row.original.pricing;
      return (
        <div className="flex flex-col">
          <span className="font-medium">
            {formatCurrency(pricing.price, pricing.currency)}
          </span>
          <span className="text-xs text-muted-foreground">
            {formatCurrency(pricing.pricePerSqFt, pricing.currency)}/sq.ft
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: 'specifications',
    header: 'Details',
    cell: ({ row }) => {
      const specs = row.original.specifications;
      return (
        <div className="flex flex-col">
          <span className="font-medium">
            {specs.bedrooms ? `${specs.bedrooms} BHK` : 'N/A'}
          </span>
          <span className="text-xs text-muted-foreground">
            {specs.superBuiltupArea} sq.ft
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: 'createdAt',
    header: 'Listed On',
    cell: ({ row }) => formatDate(row.getValue('createdAt')),
  },
  {
    id: 'actions',
    cell: ({ row, table }) => {
      const property = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => table.options.meta?.onView?.(property)}
            >
              <Eye className="mr-2 h-4 w-4" />
              View Details
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => table.options.meta?.onEdit?.(property)}
            >
              <Pencil className="mr-2 h-4 w-4" />
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => table.options.meta?.onDelete?.(property)}
              className="text-red-600"
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
]; 