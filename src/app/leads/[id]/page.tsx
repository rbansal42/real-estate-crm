'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import {
  Card,
  CardBody,
  Button,
  Chip,
  Tabs,
  Tab,
  Divider,
  Textarea,
  Input,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Select,
  SelectItem,
  RadioGroup,
  Radio,
} from '@nextui-org/react';
import {
  PhoneIcon,
  EnvelopeIcon,
  CalendarDaysIcon,
  ChatBubbleLeftRightIcon,
  ClockIcon,
  CheckCircleIcon,
  ArrowPathIcon,
  PlusIcon,
} from '@heroicons/react/24/outline';
import DashboardLayout from '@/components/layouts/DashboardLayout';
import { dummyLeads } from '@/constants/dummyData';
import type { Lead } from '@/schemas/lead.schema';
import { format } from 'date-fns';

export default function LeadDetailsPage() {
  const { id } = useParams();
  const router = useRouter();
  const [selectedTab, setSelectedTab] = useState("overview");
  const [newNote, setNewNote] = useState("");
  
  // Modal states
  const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);
  const [isInteractionModalOpen, setIsInteractionModalOpen] = useState(false);
  const [statusUpdate, setStatusUpdate] = useState({
    status: '',
    reason: '',
    assignTo: '',
    scheduleFollowUp: false,
    followUpDate: '',
    followUpNotes: '',
  });
  const [interaction, setInteraction] = useState({
    type: '',
    date: new Date().toISOString().split('.')[0],
    notes: '',
    requiresFollowUp: false,
    followUpAction: '',
    followUpDate: '',
  });

  // Find the lead from dummy data
  const lead = dummyLeads.find(l => l.id === id) as Lead;

  if (!lead) {
    return <div>Lead not found</div>;
  }

  const statusColorMap: Record<Lead['status'], "default" | "primary" | "secondary" | "success" | "warning" | "danger"> = {
    new: "primary",
    active: "success",
    pending: "warning",
    booked: "secondary",
    not_interested: "danger",
    closed: "default",
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return '-';
    return format(new Date(dateString), 'MMM d, yyyy');
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const handlePropertyClick = (propertyId: string) => {
    router.push(`/properties?property=${propertyId}`);
  };

  const handlePropertyTypeClick = (type: string) => {
    router.push(`/properties?type=${type.toLowerCase()}`);
  };

  const handleLocationClick = (location: string) => {
    router.push(`/properties?location=${encodeURIComponent(location)}`);
  };

  const handleStatusUpdate = () => {
    // TODO: Implement status update
    console.log('Status Update:', statusUpdate);
    setIsStatusModalOpen(false);
  };

  const handleInteractionSave = () => {
    // TODO: Implement interaction save
    console.log('New Interaction:', interaction);
    setIsInteractionModalOpen(false);
  };

  const onTabChange = (key: string | number) => {
    setSelectedTab(key.toString());
  };

  return (
    <DashboardLayout>
      <div className="space-y-6 p-6">
        {/* Top Header */}
        <div className="flex justify-between items-start gap-4">
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-4 flex-wrap">
              <h1 className="text-2xl font-bold">{lead.name}</h1>
              <Chip color={statusColorMap[lead.status]} variant="flat">
                {lead.status.replace('_', ' ')}
              </Chip>
            </div>
            <div className="mt-2 flex items-center gap-6 text-default-500 flex-wrap">
              <div className="flex items-center gap-1">
                <EnvelopeIcon className="w-4 h-4" />
                <span>{lead.email}</span>
              </div>
              <div className="flex items-center gap-1">
                <PhoneIcon className="w-4 h-4" />
                <span>{lead.phone}</span>
              </div>
            </div>
          </div>
          <div className="flex gap-2 flex-shrink-0">
            <Button 
              color="primary"
              variant="flat"
              startContent={<CalendarDaysIcon className="w-4 h-4" />}
              onClick={() => setIsInteractionModalOpen(true)}
            >
              Log Interaction
            </Button>
            <Button 
              color="primary"
              startContent={<ArrowPathIcon className="w-4 h-4" />}
              onClick={() => setIsStatusModalOpen(true)}
            >
              Update Status
            </Button>
          </div>
        </div>

        {/* Main Content */}
        <Tabs 
          selectedKey={selectedTab} 
          onSelectionChange={onTabChange}
        >
          <Tab
            key="overview"
            title="Overview"
          >
            <div className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardBody className="space-y-4">
                    <h3 className="text-lg font-semibold">Basic Information</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-default-500">Source</span>
                        <span>{lead.source.replace('_', ' ')}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-default-500">Assigned To</span>
                        <span>{lead.assignedTo ? `Agent #${lead.assignedTo}` : 'Unassigned'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-default-500">Created Date</span>
                        <span>{formatDate(lead.createdAt)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-default-500">Last Contact</span>
                        <span>{formatDate(lead.lastContact)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-default-500">Next Follow-up</span>
                        <span>{formatDate(lead.nextFollowup)}</span>
                      </div>
                    </div>
                  </CardBody>
                </Card>

                <Card>
                  <CardBody className="space-y-4">
                    <h3 className="text-lg font-semibold">Requirements</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-default-500">Budget Range</span>
                        <span>{formatCurrency(lead.budget.min)} - {formatCurrency(lead.budget.max)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-default-500">Property Types</span>
                        <div className="flex gap-1">
                          {lead.requirements.propertyType.map(type => (
                            <Chip 
                              key={type} 
                              size="sm" 
                              variant="flat"
                              className="cursor-pointer hover:opacity-70"
                              onClick={() => handlePropertyTypeClick(type)}
                            >
                              {type}
                            </Chip>
                          ))}
                        </div>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-default-500">Preferred Locations</span>
                        <div className="flex gap-1">
                          {lead.requirements.location.map(loc => (
                            <Chip 
                              key={loc} 
                              size="sm" 
                              variant="flat"
                              className="cursor-pointer hover:opacity-70"
                              onClick={() => handleLocationClick(loc)}
                            >
                              {loc}
                            </Chip>
                          ))}
                        </div>
                      </div>
                      {lead.requirements.minBedrooms && (
                        <div className="flex justify-between">
                          <span className="text-default-500">Min. Bedrooms</span>
                          <span>{lead.requirements.minBedrooms}</span>
                        </div>
                      )}
                      {lead.requirements.minBathrooms && (
                        <div className="flex justify-between">
                          <span className="text-default-500">Min. Bathrooms</span>
                          <span>{lead.requirements.minBathrooms}</span>
                        </div>
                      )}
                      {lead.requirements.minArea && (
                        <div className="flex justify-between">
                          <span className="text-default-500">Min. Area</span>
                          <span>{lead.requirements.minArea} sq ft</span>
                        </div>
                      )}
                    </div>
                  </CardBody>
                </Card>
              </div>

              <Card>
                <CardBody className="space-y-4">
                  <h3 className="text-lg font-semibold">Interested Properties</h3>
                  <div className="flex gap-2">
                    {lead.propertyInterest.map(id => (
                      <Chip 
                        key={id} 
                        size="sm" 
                        variant="flat"
                        className="cursor-pointer hover:opacity-70"
                        onClick={() => handlePropertyClick(id)}
                      >
                        Property #{id}
                      </Chip>
                    ))}
                  </div>
                </CardBody>
              </Card>
            </div>
          </Tab>

          <Tab
            key="history"
            title="History"
          >
            <Card>
              <CardBody>
                <div className="space-y-6">
                  {lead.notes.map(note => (
                    <div key={note.id} className="flex gap-4">
                      <div className="flex-none">
                        <ClockIcon className="w-5 h-5 text-default-400" />
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between">
                          <span className="font-medium">Agent #{note.createdBy}</span>
                          <span className="text-default-400">{formatDate(note.createdAt)}</span>
                        </div>
                        <p className="mt-1 text-sm">{note.content}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardBody>
            </Card>
          </Tab>

          <Tab
            key="notes"
            title="Notes"
          >
            <Card>
              <CardBody className="space-y-6">
                <div>
                  <Textarea
                    label="Add Note"
                    placeholder="Enter your note here..."
                    value={newNote}
                    onChange={(e) => setNewNote(e.target.value)}
                  />
                  <Button 
                    color="primary"
                    className="mt-2"
                    startContent={<PlusIcon className="w-4 h-4" />}
                  >
                    Add Note
                  </Button>
                </div>
                <Divider />
                <div className="space-y-4">
                  {lead.notes.map(note => (
                    <div key={note.id} className="p-4 bg-content2 rounded-lg">
                      <div className="flex justify-between items-start">
                        <div className="flex items-center gap-2">
                          <ChatBubbleLeftRightIcon className="w-5 h-5 text-default-400" />
                          <span className="font-medium">Agent #{note.createdBy}</span>
                        </div>
                        <span className="text-sm text-default-400">{formatDate(note.createdAt)}</span>
                      </div>
                      <p className="mt-2">{note.content}</p>
                    </div>
                  ))}
                </div>
              </CardBody>
            </Card>
          </Tab>

          <Tab
            key="followup"
            title="Follow-up"
          >
            <Card>
              <CardBody className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    type="datetime-local"
                    label="Next Follow-up Date"
                    value={lead.nextFollowup?.split('.')[0] || ''}
                    classNames={{
                      input: "cursor-pointer",
                      base: "max-w-full"
                    }}
                    placeholder=" "
                    startContent={<CalendarDaysIcon className="w-4 h-4 text-default-400" />}
                  />
                  <Select
                    label="Reminder Type"
                    placeholder="Select reminder type"
                    classNames={{
                      base: "max-w-full"
                    }}
                  >
                    <SelectItem key="call" value="call">Phone Call</SelectItem>
                    <SelectItem key="meeting" value="meeting">Meeting</SelectItem>
                    <SelectItem key="site_visit" value="site_visit">Site Visit</SelectItem>
                  </Select>
                </div>
                <Textarea
                  label="Follow-up Notes"
                  placeholder="Enter details about the follow-up..."
                />
                <div className="flex justify-end">
                  <Button 
                    color="primary"
                    startContent={<CheckCircleIcon className="w-4 h-4" />}
                  >
                    Schedule Follow-up
                  </Button>
                </div>
              </CardBody>
            </Card>
          </Tab>
        </Tabs>

        {/* Status Update Modal */}
        <Modal 
          isOpen={isStatusModalOpen} 
          onClose={() => setIsStatusModalOpen(false)}
          size="2xl"
        >
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">
                  Update Lead Status
                </ModalHeader>
                <ModalBody>
                  <div className="space-y-6">
                    <div className="flex items-center gap-4">
                      <span className="text-default-500">Current Status:</span>
                      <Chip color={statusColorMap[lead.status]} variant="flat">
                        {lead.status.replace('_', ' ')}
                      </Chip>
                    </div>

                    <RadioGroup
                      label="New Status"
                      value={statusUpdate.status}
                      onValueChange={(value) => setStatusUpdate(prev => ({ ...prev, status: value }))}
                    >
                      <Radio value="new">New</Radio>
                      <Radio value="active">Active</Radio>
                      <Radio value="pending">Pending</Radio>
                      <Radio value="booked">Booked</Radio>
                      <Radio value="not_interested">Not Interested</Radio>
                      <Radio value="closed">Closed</Radio>
                    </RadioGroup>

                    <Textarea
                      label="Reason for Status Change"
                      placeholder="Enter the reason for changing the status..."
                      value={statusUpdate.reason}
                      onChange={(e) => setStatusUpdate(prev => ({ ...prev, reason: e.target.value }))}
                    />

                    <Select
                      label="Assign To"
                      placeholder="Select team member"
                      value={statusUpdate.assignTo}
                      onChange={(e) => setStatusUpdate(prev => ({ ...prev, assignTo: e.target.value }))}
                    >
                      <SelectItem key="1" value="1">Agent #1</SelectItem>
                      <SelectItem key="2" value="2">Agent #2</SelectItem>
                    </Select>

                    <div className="space-y-4">
                      <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          id="scheduleFollowUp"
                          checked={statusUpdate.scheduleFollowUp}
                          onChange={(e) => setStatusUpdate(prev => ({ ...prev, scheduleFollowUp: e.target.checked }))}
                        />
                        <label htmlFor="scheduleFollowUp">Schedule Follow-up</label>
                      </div>

                      {statusUpdate.scheduleFollowUp && (
                        <div className="space-y-4 pl-6">
                          <Input
                            type="datetime-local"
                            label="Follow-up Date"
                            value={statusUpdate.followUpDate}
                            onChange={(e) => setStatusUpdate(prev => ({ ...prev, followUpDate: e.target.value }))}
                            classNames={{
                              input: "cursor-pointer",
                              base: "max-w-full"
                            }}
                            placeholder=" "
                            startContent={<CalendarDaysIcon className="w-4 h-4 text-default-400" />}
                          />
                          <Textarea
                            label="Follow-up Notes"
                            placeholder="Enter follow-up details..."
                            value={statusUpdate.followUpNotes}
                            onChange={(e) => setStatusUpdate(prev => ({ ...prev, followUpNotes: e.target.value }))}
                          />
                        </div>
                      )}
                    </div>
                  </div>
                </ModalBody>
                <ModalFooter>
                  <Button variant="flat" onPress={onClose}>
                    Cancel
                  </Button>
                  <Button color="primary" onPress={handleStatusUpdate}>
                    Update Status
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>

        {/* Interaction Modal */}
        <Modal 
          isOpen={isInteractionModalOpen} 
          onClose={() => setIsInteractionModalOpen(false)}
          size="2xl"
        >
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">
                  Log New Interaction
                </ModalHeader>
                <ModalBody>
                  <div className="space-y-6">
                    <Select
                      label="Interaction Type"
                      placeholder="Select type of interaction"
                      value={interaction.type}
                      onChange={(e) => setInteraction(prev => ({ ...prev, type: e.target.value }))}
                    >
                      <SelectItem key="call" value="call">Phone Call</SelectItem>
                      <SelectItem key="meeting" value="meeting">Meeting</SelectItem>
                      <SelectItem key="email" value="email">Email</SelectItem>
                      <SelectItem key="site_visit" value="site_visit">Site Visit</SelectItem>
                    </Select>

                    <Input
                      type="datetime-local"
                      label="Date & Time"
                      value={interaction.date}
                      onChange={(e) => setInteraction(prev => ({ ...prev, date: e.target.value }))}
                      classNames={{
                        input: "cursor-pointer",
                        base: "max-w-full"
                      }}
                      placeholder=" "
                      startContent={<CalendarDaysIcon className="w-4 h-4 text-default-400" />}
                    />

                    <Textarea
                      label="Interaction Notes"
                      placeholder="Enter details about the interaction..."
                      value={interaction.notes}
                      onChange={(e) => setInteraction(prev => ({ ...prev, notes: e.target.value }))}
                    />

                    <div className="space-y-4">
                      <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          id="requiresFollowUp"
                          checked={interaction.requiresFollowUp}
                          onChange={(e) => setInteraction(prev => ({ ...prev, requiresFollowUp: e.target.checked }))}
                        />
                        <label htmlFor="requiresFollowUp">Requires Follow-up</label>
                      </div>

                      {interaction.requiresFollowUp && (
                        <div className="space-y-4 pl-6">
                          <Input
                            label="Follow-up Action"
                            placeholder="e.g., Send brochure, Call back"
                            value={interaction.followUpAction}
                            onChange={(e) => setInteraction(prev => ({ ...prev, followUpAction: e.target.value }))}
                          />
                          <Input
                            type="datetime-local"
                            label="Follow-up Date"
                            value={interaction.followUpDate}
                            onChange={(e) => setInteraction(prev => ({ ...prev, followUpDate: e.target.value }))}
                            classNames={{
                              input: "cursor-pointer",
                              base: "max-w-full"
                            }}
                            placeholder=" "
                            startContent={<CalendarDaysIcon className="w-4 h-4 text-default-400" />}
                          />
                        </div>
                      )}
                    </div>
                  </div>
                </ModalBody>
                <ModalFooter>
                  <Button variant="flat" onPress={onClose}>
                    Cancel
                  </Button>
                  <Button color="primary" onPress={handleInteractionSave}>
                    Save Interaction
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
      </div>
    </DashboardLayout>
  );
} 