import { AlertCircle } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { logger } from "@/lib/logger"

interface TeamErrorBoundaryProps {
  error: Error
  reset: () => void
}

export function TeamErrorBoundary({ error, reset }: TeamErrorBoundaryProps) {
  logger.error("Team page error:", error)

  return (
    <Alert variant="destructive" className="mx-auto max-w-2xl mt-8">
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>Something went wrong</AlertTitle>
      <AlertDescription className="mt-2 flex flex-col gap-3">
        <p>An error occurred while loading the team management page.</p>
        <p className="text-sm font-mono">{error.message}</p>
        <Button
          variant="outline"
          size="sm"
          className="w-fit"
          onPress={reset}
        >
          Try again
        </Button>
      </AlertDescription>
    </Alert>
  )
} 