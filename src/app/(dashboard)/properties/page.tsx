"use client"

import { useState } from 'react';
import {
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { columns } from '@/components/properties/property-columns';
import { PropertyDataTable } from "@/components/properties/property-data-table";
import { PropertyTableToolbar } from "@/components/properties/property-table-toolbar";
import { PropertyTableSkeleton } from "@/components/properties/property-table-skeleton";
import { PropertyDialog } from "@/components/properties/property-dialog";
import { usePropertyData } from "@/hooks/use-property-data";
import { Property } from "@/lib/types/property";
import { useToast } from "@/hooks/use-toast";

export default function PropertiesPage() {
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = useState({})
  const [propertyDialogOpen, setPropertyDialogOpen] = useState(false)
  const [selectedProperty, setSelectedProperty] = useState<Property | undefined>()

  const { toast } = useToast()
  const { 
    properties, 
    isLoading,
    addProperty,
    updateProperty,
    deleteProperty,
    isAddingProperty,
    isUpdatingProperty,
    isDeletingProperty,
  } = usePropertyData();

  const handleAddProperty = () => {
    setSelectedProperty(undefined);
    setPropertyDialogOpen(true);
  };

  const handleViewProperty = (property: Property) => {
    // TODO: Implement view property dialog
    toast({
      title: "Coming Soon",
      description: "View property functionality will be implemented soon.",
    });
  };

  const handleEditProperty = (property: Property) => {
    setSelectedProperty(property);
    setPropertyDialogOpen(true);
  };

  const handleDeleteProperty = async (property: Property) => {
    try {
      await deleteProperty(property.id);
      toast({
        title: "Property deleted",
        description: `${property.title} has been deleted.`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete property. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handlePropertySubmit = async (data: any) => {
    try {
      if (selectedProperty) {
        await updateProperty({ ...data, id: selectedProperty.id });
        toast({
          title: "Property updated",
          description: `${data.title} has been updated.`,
        });
      } else {
        await addProperty(data);
        toast({
          title: "Property added",
          description: `${data.title} has been added.`,
        });
      }
      setPropertyDialogOpen(false);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save property. Please try again.",
        variant: "destructive",
      });
    }
  };

  const table = useReactTable({
    data: properties || [],
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
    meta: {
      onView: handleViewProperty,
      onEdit: handleEditProperty,
      onDelete: handleDeleteProperty,
    },
  })

  if (isLoading) {
    return <PropertyTableSkeleton />
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Properties</h1>
      </div>
      <div className="space-y-4">
        <PropertyTableToolbar 
          table={table}
          onAdd={handleAddProperty}
        />
        <PropertyDataTable table={table} />
      </div>

      <PropertyDialog
        property={selectedProperty}
        open={propertyDialogOpen}
        onOpenChange={setPropertyDialogOpen}
        onSubmit={handlePropertySubmit}
        isSubmitting={isAddingProperty || isUpdatingProperty}
      />
    </div>
  )
} 