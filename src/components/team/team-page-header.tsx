import { Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { logger } from "@/lib/logger"

interface TeamPageHeaderProps {
  onCreateMember: () => void
}

export function TeamPageHeader({ onCreateMember }: TeamPageHeaderProps) {
  const handleCreateMember = () => {
    logger.info("Opening create team member dialog")
    onCreateMember()
  }

  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Team Management</h1>
        <p className="text-muted-foreground mt-1">
          Manage your team members, their roles, and permissions.
        </p>
      </div>
      <Button
        size="default"
        className="w-full md:w-auto"
        onPress={handleCreateMember}
      >
        <Users className="mr-2 h-4 w-4" />
        Add Team Member
      </Button>
    </div>
  )
} 