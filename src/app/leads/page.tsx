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
import { columns } from '@/components/leads/lead-columns';
import { LeadsDataTable } from "@/components/leads/leads-data-table";
import { LeadsTableToolbar } from "@/components/leads/leads-table-toolbar";
import { LeadsTableSkeleton } from "@/components/leads/leads-table-skeleton";
import { LeadDialog } from "@/components/leads/lead-dialog";
import { useLeadData } from "@/hooks/use-lead-data";
import { Lead } from "@/lib/types/lead";
import { useToast } from "@/hooks/use-toast";

export default function LeadsPage() {
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = useState({})
  const [leadDialogOpen, setLeadDialogOpen] = useState(false)
  const [selectedLead, setSelectedLead] = useState<Lead | undefined>()

  const { toast } = useToast()
  const { 
    leads, 
    isLoading,
    addLead,
    updateLead,
    deleteLead,
    isAddingLead,
    isUpdatingLead,
    isDeletingLead,
  } = useLeadData();

  const handleAddLead = () => {
    setSelectedLead(undefined);
    setLeadDialogOpen(true);
  };

  const handleViewLead = (lead: Lead) => {
    // TODO: Implement view lead dialog
    toast({
      title: "Coming Soon",
      description: "View lead functionality will be implemented soon.",
    });
  };

  const handleEditLead = (lead: Lead) => {
    setSelectedLead(lead);
    setLeadDialogOpen(true);
  };

  const handleDeleteLead = async (lead: Lead) => {
    try {
      await deleteLead(lead.id);
      toast({
        title: "Lead deleted",
        description: `${lead.contact.name} has been deleted.`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete lead. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleLeadSubmit = async (data: any) => {
    try {
      if (selectedLead) {
        await updateLead({ ...data, id: selectedLead.id });
        toast({
          title: "Lead updated",
          description: `${data.contact.name} has been updated.`,
        });
      } else {
        await addLead(data);
        toast({
          title: "Lead added",
          description: `${data.contact.name} has been added.`,
        });
      }
      setLeadDialogOpen(false);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save lead. Please try again.",
        variant: "destructive",
      });
    }
  };

  const table = useReactTable({
    data: leads || [],
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
      onView: handleViewLead,
      onEdit: handleEditLead,
      onDelete: handleDeleteLead,
    },
  })

  if (isLoading) {
    return <LeadsTableSkeleton />
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Leads</h1>
      </div>
      <div className="space-y-4">
        <LeadsTableToolbar 
          table={table}
          onAdd={handleAddLead}
        />
        <LeadsDataTable table={table} />
      </div>

      <LeadDialog
        lead={selectedLead}
        open={leadDialogOpen}
        onOpenChange={setLeadDialogOpen}
        onSubmit={handleLeadSubmit}
        isSubmitting={isAddingLead || isUpdatingLead}
      />
    </div>
  )
} 