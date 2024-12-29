"use client"

import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerDescription, DrawerFooter, DrawerClose } from "@/components/ui/drawer"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Calendar, Phone, Mail, User, Building2, Clock, MessageSquare, FileText, Wallet, MapPin, Home } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { logger } from "@/lib/logger"
import { LeadScheduleDialog } from "@/components/leads/lead-schedule-dialog"
import { LeadStatusDialog } from "@/components/leads/lead-status-dialog"
import { useState } from "react"
import { Lead } from "@/hooks/use-leads-data"
import Image from "next/image"

interface LeadDetailsDrawerProps {
  lead: Lead | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function LeadDetailsDrawer({ lead, open, onOpenChange }: LeadDetailsDrawerProps) {
  const [scheduleDialogOpen, setScheduleDialogOpen] = useState(false)
  const [statusDialogOpen, setStatusDialogOpen] = useState(false)

  if (!lead) return null

  const handleSchedule = () => {
    logger.info(`Opening schedule dialog for lead: ${lead.id}`)
    setScheduleDialogOpen(true)
  }

  const handleStatusChange = () => {
    logger.info(`Opening status dialog for lead: ${lead.id}`)
    setStatusDialogOpen(true)
  }

  const getInteractionIcon = (type: string) => {
    switch (type) {
      case "Call":
        return { icon: Phone, color: "text-green-500" }
      case "Email":
        return { icon: Mail, color: "text-blue-500" }
      case "Meeting":
        return { icon: Calendar, color: "text-purple-500" }
      case "WhatsApp":
        return { icon: MessageSquare, color: "text-emerald-500" }
      default:
        return { icon: MessageSquare, color: "text-gray-500" }
    }
  }

  return (
    <>
      <Drawer open={open} onOpenChange={onOpenChange}>
        <DrawerContent className="h-[90vh]">
          <DrawerHeader>
            <DrawerTitle className="text-2xl font-bold flex items-center gap-2">
              <User className="h-6 w-6" />
              {lead.name}
            </DrawerTitle>
            <DrawerDescription className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                {lead.email}
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                {lead.phone}
              </div>
              <div className="flex items-center gap-2">
                <Building2 className="h-4 w-4" />
                Source: {lead.source}
              </div>
              <Badge 
                variant={lead.status === "New" ? "default" : "secondary"}
                className={lead.status === "New" ? "bg-primary text-primary-foreground" : ""}
              >
                {lead.status}
              </Badge>
            </DrawerDescription>
          </DrawerHeader>

          <ScrollArea className="flex-1 px-4">
            {/* Requirements Section */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                <FileText className="h-5 w-5 text-primary" />
                Requirements
              </h3>
              <div className="grid grid-cols-2 gap-4 bg-muted/30 p-4 rounded-lg border border-border">
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground flex items-center gap-1">
                    <Building2 className="h-3 w-3" />
                    Type
                  </p>
                  <p className="font-medium">{lead.requirements.type}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground flex items-center gap-1">
                    <Wallet className="h-3 w-3" />
                    Budget
                  </p>
                  <p className="font-medium">{lead.requirements.budget}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground flex items-center gap-1">
                    <MapPin className="h-3 w-3" />
                    Location
                  </p>
                  <p className="font-medium">{lead.requirements.location}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground flex items-center gap-1">
                    <Home className="h-3 w-3" />
                    Property Type
                  </p>
                  <p className="font-medium">{lead.requirements.propertyType}</p>
                </div>
              </div>
            </div>

            <Separator className="my-4" />

            {/* Agent Section */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2">Assigned Agent</h3>
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-secondary/10 flex items-center justify-center">
                  {lead.agent.avatar ? (
                    <Image 
                      src={lead.agent.avatar} 
                      alt={lead.agent.name}
                      width={40}
                      height={40}
                      className="rounded-full object-cover"
                    />
                  ) : (
                    <User className="h-6 w-6" />
                  )}
                </div>
                <div>
                  <p className="font-medium">{lead.agent.name}</p>
                  <p className="text-sm text-muted-foreground">{lead.agent.role}</p>
                </div>
              </div>
            </div>

            <Separator className="my-4" />

            {/* Interaction History */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Interaction History</h3>
              <div className="space-y-4">
                {lead.interactions.map((interaction) => {
                  const { icon: Icon, color } = getInteractionIcon(interaction.type)
                  return (
                    <div 
                      key={interaction.id} 
                      className="group bg-muted/30 hover:bg-muted/50 transition-colors p-3 rounded-lg border border-border hover:border-primary/20"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <div className={`${color} group-hover:scale-110 transition-transform`}>
                            <Icon className="h-4 w-4" />
                          </div>
                          <span className="font-medium">{interaction.type}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Clock className="h-4 w-4" />
                          {interaction.date}
                        </div>
                      </div>
                      <p className="text-sm mb-1 leading-relaxed">{interaction.notes}</p>
                      <p className="text-sm text-muted-foreground flex items-center gap-1">
                        <User className="h-3 w-3" />
                        {interaction.agent}
                      </p>
                    </div>
                  )
                })}
              </div>
            </div>
          </ScrollArea>

          <DrawerFooter className="border-t pt-4">
            <div className="flex gap-2">
              <Button 
                className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground transform hover:scale-105 transition-all active:scale-95" 
                onClick={handleSchedule}
              >
                <Calendar className="mr-2 h-4 w-4" />
                Schedule
              </Button>
              <Button 
                className="flex-1 bg-secondary hover:bg-secondary/90 text-secondary-foreground transform hover:scale-105 transition-all active:scale-95" 
                onClick={handleStatusChange}
              >
                Mark Status
              </Button>
            </div>
            <DrawerClose asChild>
              <Button variant="outline">Close</Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>

      <LeadScheduleDialog
        open={scheduleDialogOpen}
        onOpenChange={setScheduleDialogOpen}
        leadId={lead.id}
      />

      <LeadStatusDialog
        open={statusDialogOpen}
        onOpenChange={setStatusDialogOpen}
        leadId={lead.id}
        currentStatus={lead.status}
      />
    </>
  )
} 