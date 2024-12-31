"use client"

import { useState } from 'react';
import { useLeadsData } from '@/hooks/use-leads-data';
import { getLeadColumns } from '@/components/leads/lead-columns';
import { LeadDataTable } from '@/components/leads/lead-data-table';
import { LeadDialog } from '@/components/leads/lead-dialog';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { Lead } from '@/lib/types/lead';
import { useToast } from '@/hooks/use-toast';

type LeadFormData = {
  contact: {
    name: string;
    email: string;
    phone: string;
    address?: string;
  };
  source: Lead['source'];
  status: Lead['status'];
  budget: {
    min: number;
    max: number;
  };
  requirements: string;
  notes: string;
  assignedTo?: string;
  propertyPreferences?: {
    type: string[];
    location: string[];
    minBedrooms?: number;
    maxBedrooms?: number;
    minBathrooms?: number;
    maxBathrooms?: number;
    minArea?: number;
    maxArea?: number;
  };
  priority: 'low' | 'medium' | 'high';
};

export default function LeadsPage() {
  const {
    data: leads = [],
    isLoading,
    addLead,
    updateLead,
    deleteLead,
    isAddingLead,
    isUpdatingLead,
  } = useLeadsData();
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const { toast } = useToast();

  const handleAddLead = () => {
    setSelectedLead(null);
    setDialogOpen(true);
  };

  const handleEditLead = (lead: Lead) => {
    setSelectedLead(lead);
    setDialogOpen(true);
  };

  const handleDeleteLead = async (id: string) => {
    try {
      await deleteLead(id);
      toast({
        title: 'Lead deleted',
        description: 'The lead has been successfully deleted.',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to delete the lead. Please try again.',
        variant: 'destructive',
      });
    }
  };

  const handleSubmitLead = async (data: LeadFormData) => {
    try {
      if (selectedLead) {
        await updateLead({
          ...data,
          id: selectedLead.id,
          createdAt: selectedLead.createdAt,
          updatedAt: new Date().toISOString(),
        });
        toast({
          title: 'Lead updated',
          description: 'The lead has been successfully updated.',
        });
      } else {
        await addLead({
          ...data,
          id: crypto.randomUUID(),
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        });
        toast({
          title: 'Lead added',
          description: 'The lead has been successfully added.',
        });
      }
      setDialogOpen(false);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to save the lead. Please try again.',
        variant: 'destructive',
      });
      throw error; // Re-throw to let the form handle the error state
    }
  };

  const columns = getLeadColumns({
    onEdit: handleEditLead,
    onDelete: handleDeleteLead,
  });

  if (isLoading) {
    return (
      <div className="flex h-[calc(100vh-4rem)] items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 p-4 md:p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Leads</h1>
          <p className="text-muted-foreground">
            Manage and track your leads from various sources
          </p>
        </div>
        <Button onClick={handleAddLead}>
          <Plus className="mr-2 h-4 w-4" />
          Add Lead
        </Button>
      </div>

      <LeadDataTable columns={columns} data={leads} />

      <LeadDialog
        lead={selectedLead || undefined}
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        onSubmit={handleSubmitLead}
        isSubmitting={isAddingLead || isUpdatingLead}
      />
    </div>
  );
} 