"use client"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Calendar } from "@/components/ui/calendar"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useState } from "react"
import { logger } from "@/lib/logger"

interface LeadScheduleDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  leadId: string
}

export function LeadScheduleDialog({ open, onOpenChange, leadId }: LeadScheduleDialogProps) {
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [notes, setNotes] = useState("")

  const handleSchedule = () => {
    logger.info(`Scheduling interaction for lead ${leadId} on ${date}`)
    // Implement scheduling logic
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Schedule Interaction</DialogTitle>
          <DialogDescription>
            Set a date and time for the next interaction with this lead.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label>Date</Label>
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="rounded-md border"
              classNames={{
                day_selected: "bg-primary text-primary-foreground hover:bg-primary/90",
                day_today: "bg-secondary/10 text-secondary-foreground",
              }}
            />
          </div>
          <div className="grid gap-2">
            <Label>Notes</Label>
            <Textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Add any notes about the scheduled interaction..."
            />
          </div>
        </div>
        <DialogFooter>
          <Button 
            variant="outline" 
            onClick={() => onOpenChange(false)}
            className="border-primary/20 hover:bg-primary/5"
          >
            Cancel
          </Button>
          <Button 
            onClick={handleSchedule}
            className="bg-primary hover:bg-primary/90 text-primary-foreground"
          >
            Schedule
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
} 