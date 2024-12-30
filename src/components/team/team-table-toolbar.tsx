"use client"

import { Cross2Icon } from '@radix-ui/react-icons';
import { Table } from '@tanstack/react-table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { DataTableViewOptions } from '@/components/ui/data-table-view-options';
import { Plus, UserPlus } from 'lucide-react';
import { logger } from '@/lib/logger';
import { TeamMember } from '@/lib/types/team';

interface TeamTableToolbarProps {
  table: Table<TeamMember>;
  onAdd: () => void;
}

export function TeamTableToolbar({ table, onAdd }: TeamTableToolbarProps) {
  const isFiltered = table.getState().columnFilters.length > 0;

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <Input
          placeholder="Filter team members..."
          value={(table.getColumn('name')?.getFilterValue() as string) ?? ''}
          onChange={(event) =>
            table.getColumn('name')?.setFilterValue(event.target.value)
          }
          className="h-8 w-[150px] lg:w-[250px]"
        />
        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <Cross2Icon className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
      <div className="flex items-center space-x-2">
        <Button
          variant="default"
          size="sm"
          className="h-8"
          onClick={onAdd}
        >
          <UserPlus className="mr-2 h-4 w-4" />
          Add Member
        </Button>
        <DataTableViewOptions table={table} />
      </div>
    </div>
  );
} 