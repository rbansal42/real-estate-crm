import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { MoreHorizontal, Trash, UserCheck, UserX, KeyRound } from "lucide-react"
import { logger } from "@/lib/logger"

interface BulkActionsDropdownProps {
  selectedCount: number
  onAction: (action: string) => void
  disabled?: boolean
}

export function BulkActionsDropdown({
  selectedCount,
  onAction,
  disabled = false,
}: BulkActionsDropdownProps) {
  if (selectedCount === 0) return null

  const handleAction = (action: string) => {
    logger.info("Bulk action selected", { action, selectedCount })
    onAction(action)
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" disabled={disabled}>
          <MoreHorizontal className="h-4 w-4 mr-2" />
          Bulk Actions ({selectedCount})
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onSelect={() => handleAction("activate")}>
          <UserCheck className="h-4 w-4 mr-2" />
          Activate
        </DropdownMenuItem>
        <DropdownMenuItem onSelect={() => handleAction("deactivate")}>
          <UserX className="h-4 w-4 mr-2" />
          Deactivate
        </DropdownMenuItem>
        <DropdownMenuItem onSelect={() => handleAction("reset-password")}>
          <KeyRound className="h-4 w-4 mr-2" />
          Reset Password
        </DropdownMenuItem>
        <DropdownMenuItem
          onSelect={() => handleAction("delete")}
          className="text-destructive focus:text-destructive"
        >
          <Trash className="h-4 w-4 mr-2" />
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
} 