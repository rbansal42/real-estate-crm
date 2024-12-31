"use client"

import { useState } from 'react'
import { ErrorBoundary, FallbackProps } from 'react-error-boundary'
import {
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table'

import { columns } from '@/components/team/team-columns'
import { TeamDataTable } from "@/components/team/team-data-table"
import { TeamTableToolbar } from "@/components/team/team-table-toolbar"
import { TeamTableSkeleton } from "@/components/team/team-table-skeleton"
import { TeamMemberDialog } from "@/components/team/team-member-dialog"
import { TeamPermissionsDialog } from "@/components/team/team-permissions-dialog"
import { TeamErrorBoundary } from "@/components/team/team-error-boundary"
import { TeamPageHeader } from "@/components/team/team-page-header"
import { DeleteConfirmationDialog } from "@/components/team/delete-confirmation-dialog"
import { BulkActionsDropdown } from "@/components/team/bulk-actions-dropdown"

import { useTeamData } from "@/hooks/use-team-data"
import { useToast } from "@/hooks/use-toast"
import { logger } from '@/lib/logger'
import { TeamMember, TeamMemberFormData } from '@/lib/types/team'

function TeamErrorBoundaryWrapper({ error, resetErrorBoundary }: FallbackProps) {
  return (
    <TeamErrorBoundary
      error={error}
      reset={resetErrorBoundary}
    />
  )
}

export default function TeamPage() {
  // Table state
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = useState({})

  // Dialog state
  const [memberDialogOpen, setMemberDialogOpen] = useState(false)
  const [permissionsDialogOpen, setPermissionsDialogOpen] = useState(false)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [selectedMember, setSelectedMember] = useState<TeamMember | undefined>()
  const [membersToDelete, setMembersToDelete] = useState<string[]>([])

  const { toast } = useToast()
  const { 
    team, 
    isLoading,
    addTeamMember,
    updateTeamMember,
    deleteTeamMember,
    bulkDeleteTeamMembers,
    bulkUpdateTeamMembers,
    isAddingTeamMember,
    isUpdatingTeamMember,
    isDeletingTeamMember,
  } = useTeamData()

  const handleAddMember = () => {
    logger.info("Opening add member dialog")
    setSelectedMember(undefined)
    setMemberDialogOpen(true)
  }

  const handleEditMember = (member: TeamMember) => {
    logger.info("Opening edit member dialog", { memberId: member.id })
    setSelectedMember(member)
    setMemberDialogOpen(true)
  }

  const handleManagePermissions = (member: TeamMember) => {
    logger.info("Opening permissions dialog", { memberId: member.id })
    setSelectedMember(member)
    setPermissionsDialogOpen(true)
  }

  const handleDeleteClick = (member: TeamMember) => {
    logger.info("Opening delete confirmation", { memberId: member.id })
    setSelectedMember(member)
    setMembersToDelete([member.id])
    setDeleteDialogOpen(true)
  }

  const handleBulkAction = async (action: string) => {
    logger.info("Handling bulk action", { action, selectedRows: Object.keys(rowSelection) })
    const selectedIds = Object.keys(rowSelection)

    switch (action) {
      case "delete":
        setMembersToDelete(selectedIds)
        setDeleteDialogOpen(true)
        break
      case "activate":
        await bulkUpdateTeamMembers({ 
          ids: selectedIds, 
          data: { status: "active" } 
        })
        toast({ title: "Team members activated" })
        break
      case "deactivate":
        await bulkUpdateTeamMembers({ 
          ids: selectedIds, 
          data: { status: "inactive" } 
        })
        toast({ title: "Team members deactivated" })
        break
      case "reset-password":
        // Implement password reset logic
        toast({ title: "Password reset emails sent" })
        break
    }
  }

  const handleDeleteConfirm = async () => {
    try {
      if (membersToDelete.length === 1) {
        await deleteTeamMember(membersToDelete[0])
        toast({
          title: "Team member deleted",
          description: `${selectedMember?.name} has been removed from the team.`,
        })
      } else {
        await bulkDeleteTeamMembers(membersToDelete)
        toast({
          title: "Team members deleted",
          description: `${membersToDelete.length} members have been removed from the team.`,
        })
      }
      setDeleteDialogOpen(false)
      setRowSelection({})
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete team member(s). Please try again.",
        variant: "destructive",
      })
    }
  }

  const handleMemberSubmit = async (data: TeamMemberFormData) => {
    try {
      if (selectedMember) {
        await updateTeamMember({ ...data, id: selectedMember.id })
        toast({
          title: "Team member updated",
          description: `${data.name}'s details have been updated.`,
        })
      } else {
        await addTeamMember(data)
        toast({
          title: "Team member added",
          description: `${data.name} has been added to the team.`,
        })
      }
      setMemberDialogOpen(false)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save team member. Please try again.",
        variant: "destructive",
      })
    }
  }

  const handlePermissionsSubmit = async (permissions: TeamMember['permissions']) => {
    if (!selectedMember) return
    try {
      await updateTeamMember({
        id: selectedMember.id,
        permissions,
      })
      toast({
        title: "Permissions updated",
        description: `${selectedMember.name}'s permissions have been updated.`,
      })
      setPermissionsDialogOpen(false)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update permissions. Please try again.",
        variant: "destructive",
      })
    }
  }

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
      onDelete: handleDeleteClick,
    },
  })

  if (isLoading) {
    return <TeamTableSkeleton />
  }

  return (
    <ErrorBoundary FallbackComponent={TeamErrorBoundaryWrapper}>
      <div className="space-y-6">
        <TeamPageHeader onCreateMember={handleAddMember} />
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <TeamTableToolbar table={table} />
            <BulkActionsDropdown
              selectedCount={Object.keys(rowSelection).length}
              onAction={handleBulkAction}
              disabled={isUpdatingTeamMember || isDeletingTeamMember}
            />
          </div>
          
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

        <DeleteConfirmationDialog
          open={deleteDialogOpen}
          onOpenChange={setDeleteDialogOpen}
          onConfirm={handleDeleteConfirm}
          isLoading={isDeletingTeamMember}
          title={membersToDelete.length > 1 ? "Delete Team Members" : "Delete Team Member"}
          description={
            membersToDelete.length > 1
              ? `Are you sure you want to delete ${membersToDelete.length} team members? This action cannot be undone.`
              : `Are you sure you want to delete ${selectedMember?.name}? This action cannot be undone.`
          }
        />
      </div>
    </ErrorBoundary>
  )
} 