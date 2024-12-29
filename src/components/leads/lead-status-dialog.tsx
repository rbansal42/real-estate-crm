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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useState } from "react"
import { logger } from "@/lib/logger"

interface LeadStatusDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  leadId: string
  currentStatus: string
}

const STATUS_OPTIONS = [
  { value: "New", color: "bg-primary text-primary-foreground" },
  { value: "Contacted", color: "bg-secondary text-secondary-foreground" },
  { value: "Qualified", color: "bg-green-500 text-white" },
  { value: "Proposal", color: "bg-yellow-500 text-black" },
  { value: "Negotiation", color: "bg-orange-500 text-white" },
  { value: "Closed Won", color: "bg-emerald-500 text-white" },
  { value: "Closed Lost", color: "bg-red-500 text-white" },
]

export function LeadStatusDialog({ 
  open, 
  onOpenChange, 
  leadId, 
  currentStatus 
}: LeadStatusDialogProps) {
  const [status, setStatus] = useState(currentStatus)
  const [notes, setNotes] = useState("")

  const handleStatusChange = () => {
    logger.info(`Updating status for lead ${leadId} to ${status}`)
    // Implement status change logic
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Update Lead Status</DialogTitle>
          <DialogDescription>
            Change the current status of this lead and add notes.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label>Status</Label>
            <Select value={status} onValueChange={setStatus}>
              <SelectTrigger>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                {STATUS_OPTIONS.map((option) => (
                  <SelectItem 
                    key={option.value} 
                    value={option.value}
                    className={`${option.color} rounded-md my-1`}
                  >
                    {option.value}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-2">
            <Label>Notes</Label>
            <Textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Add notes about the status change..."
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleStatusChange}>Update Status</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
} 