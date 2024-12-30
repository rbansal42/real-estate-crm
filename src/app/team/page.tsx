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
import { columns } from '@/components/team/team-columns';
import { TeamDataTable } from "@/components/team/team-data-table";
import { TeamTableToolbar } from "@/components/team/team-table-toolbar";
import { TeamTableSkeleton } from "@/components/team/team-table-skeleton";
import { TeamMemberDialog } from "@/components/team/team-member-dialog";
import { TeamPermissionsDialog } from "@/components/team/team-permissions-dialog";
import { useTeamData } from "@/hooks/use-team-data";
import { TeamMember } from "@/lib/types/team";
import { logger } from '@/lib/logger';
import { useToast } from "@/hooks/use-toast";

export default function TeamPage() {
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = useState({})
  const [memberDialogOpen, setMemberDialogOpen] = useState(false)
  const [permissionsDialogOpen, setPermissionsDialogOpen] = useState(false)
  const [selectedMember, setSelectedMember] = useState<TeamMember | undefined>()

  const { toast } = useToast()
  const { 
    team, 
    isLoading,
    addTeamMember,
    updateTeamMember,
    deleteTeamMember,
    isAddingTeamMember,
    isUpdatingTeamMember,
    isDeletingTeamMember,
  } = useTeamData();

  const handleAddMember = () => {
    setSelectedMember(undefined);
    setMemberDialogOpen(true);
  };

  const handleEditMember = (member: TeamMember) => {
    setSelectedMember(member);
    setMemberDialogOpen(true);
  };

  const handleManagePermissions = (member: TeamMember) => {
    setSelectedMember(member);
    setPermissionsDialogOpen(true);
  };

  const handleDeleteMember = async (member: TeamMember) => {
    try {
      await deleteTeamMember(member.id);
      toast({
        title: "Team member deleted",
        description: `${member.name} has been removed from the team.`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete team member. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleMemberSubmit = async (data: any) => {
    try {
      if (selectedMember) {
        await updateTeamMember({ ...data, id: selectedMember.id });
        toast({
          title: "Team member updated",
          description: `${data.name}'s details have been updated.`,
        });
      } else {
        await addTeamMember(data);
        toast({
          title: "Team member added",
          description: `${data.name} has been added to the team.`,
        });
      }
      setMemberDialogOpen(false);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save team member. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handlePermissionsSubmit = async (permissions: any) => {
    if (!selectedMember) return;
    try {
      await updateTeamMember({
        id: selectedMember.id,
        permissions,
      });
      toast({
        title: "Permissions updated",
        description: `${selectedMember.name}'s permissions have been updated.`,
      });
      setPermissionsDialogOpen(false);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update permissions. Please try again.",
        variant: "destructive",
      });
    }
  };

  const table = useReactTable({
    data: team || [],
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
      onEdit: handleEditMember,
      onManagePermissions: handleManagePermissions,
      onDelete: handleDeleteMember,
    },
  })

  if (isLoading) {
    return <TeamTableSkeleton />
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Team</h1>
      </div>
      <div className="space-y-4">
        <TeamTableToolbar 
          table={table}
          onAdd={handleAddMember}
        />
        <TeamDataTable table={table} />
      </div>

      <TeamMemberDialog
        member={selectedMember}
        open={memberDialogOpen}
        onOpenChange={setMemberDialogOpen}
        onSubmit={handleMemberSubmit}
        isSubmitting={isAddingTeamMember || isUpdatingTeamMember}
      />

      {selectedMember && (
        <TeamPermissionsDialog
          member={selectedMember}
          open={permissionsDialogOpen}
          onOpenChange={setPermissionsDialogOpen}
          onSubmit={handlePermissionsSubmit}
          isSubmitting={isUpdatingTeamMember}
        />
      )}
    </div>
  )
} 