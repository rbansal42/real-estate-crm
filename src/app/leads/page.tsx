'use client';

import { useState, useMemo } from 'react';
import {
  Card,
  CardBody,
  Button,
  Select,
  SelectItem,
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
  Chip,
  Input,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Selection,
  SortDescriptor,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Textarea,
  Divider,
} from '@nextui-org/react';
import {
  PlusIcon,
  FunnelIcon,
  MagnifyingGlassIcon,
  ArrowDownTrayIcon,
  EllipsisVerticalIcon,
  EyeIcon,
  PencilIcon,
  TrashIcon,
  ChatBubbleLeftIcon,
  UserGroupIcon,
} from '@heroicons/react/24/outline';
import DashboardLayout from '@/components/layouts/DashboardLayout';
import { dummyLeads } from '@/constants/dummyData';
import type { Lead } from '@/schemas/lead.schema';
import { useRouter } from 'next/navigation';

// Define column types
type ColumnKey = "lead" | "contact" | "propertyInterest" | "status" | "assignedTo" | "lastActivity" | "actions";

// Add type for TableColumn
type TableColumnType = {
  name: string;
  uid: ColumnKey;
  sortable?: boolean;
  width?: number;
  filterOptions?: Array<{ key: string; label: string; }>;
};

export default function LeadsPage() {
  const router = useRouter();
  const [selectedStatus, setSelectedStatus] = useState<Selection>(new Set(["all"]));
  const [selectedSource] = useState<Selection>(new Set(["all"]));
  const [selectedAgent, setSelectedAgent] = useState<Selection>(new Set(["all"]));
  const [dateRange, setDateRange] = useState<Selection>(new Set(["all"]));
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLeads, setSelectedLeads] = useState<Selection>(new Set([]));
  const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({
    column: "lead",
    direction: "ascending",
  });
  const [isNewLeadModalOpen, setIsNewLeadModalOpen] = useState(false);
  const [newLead, setNewLead] = useState({
    name: '',
    email: '',
    phone: '',
    source: '',
    budget: {
      min: 0,
      max: 0
    },
    requirements: {
      propertyType: [] as string[],
      location: [] as string[],
      minBedrooms: undefined as number | undefined,
      minBathrooms: undefined as number | undefined,
      minArea: undefined as number | undefined
    }
  });

  // Calculate lead statistics
  const leadStats = {
    totalLeads: dummyLeads.length,
    activeLeads: dummyLeads.filter(lead => lead.status === 'active').length,
    pendingLeads: dummyLeads.filter(lead => lead.status === 'pending').length,
    closedLeads: dummyLeads.filter(lead => lead.status === 'closed').length,
  };

  const statusColorMap: Record<Lead['status'], "default" | "primary" | "secondary" | "success" | "warning" | "danger"> = {
    new: "primary",
    active: "success",
    pending: "warning",
    booked: "secondary",
    not_interested: "danger",
    closed: "default",
  };

  // Filter and sort leads
  const sortedAndFilteredLeads = useMemo(() => {
    // First filter the leads
    const filtered = dummyLeads.filter(lead => {
      const matchesSearch = searchQuery === "" || 
        lead.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        lead.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        lead.phone.includes(searchQuery);

      const statusKeys = Array.from(selectedStatus);
      const sourceKeys = Array.from(selectedSource);
      const agentKeys = Array.from(selectedAgent);
      const dateKeys = Array.from(dateRange);

      const matchesStatus = statusKeys.includes("all") || statusKeys.includes(lead.status);
      const matchesSource = sourceKeys.includes("all") || sourceKeys.includes(lead.source);
      const matchesAgent = agentKeys.includes("all") || 
        (lead.assignedTo && agentKeys.includes(lead.assignedTo));

      let matchesDate = true;
      if (!dateKeys.includes("all")) {
        const leadDate = new Date(lead.createdAt);
        const now = new Date();
        const daysDiff = (now.getTime() - leadDate.getTime()) / (1000 * 3600 * 24);

        switch (dateKeys[0]) {
          case "today":
            matchesDate = daysDiff < 1;
            break;
          case "week":
            matchesDate = daysDiff < 7;
            break;
          case "month":
            matchesDate = daysDiff < 30;
            break;
        }
      }

      return matchesSearch && matchesStatus && matchesSource && matchesAgent && matchesDate;
    });

    // Then sort the filtered results
    return [...filtered].sort((a, b) => {
      let first: string | number;
      let second: string | number;

      // Handle special cases for complex columns
      switch (sortDescriptor.column) {
        case "lead":
          first = a.name;
          second = b.name;
          break;
        case "contact":
          first = a.email;
          second = b.email;
          break;
        case "lastActivity":
          first = new Date(a.lastContact || "").getTime();
          second = new Date(b.lastContact || "").getTime();
          break;
        case "propertyInterest":
          first = a.propertyInterest.length;
          second = b.propertyInterest.length;
          break;
        case "status":
          first = a.status;
          second = b.status;
          break;
        case "assignedTo":
          first = a.assignedTo || "";
          second = b.assignedTo || "";
          break;
        default:
          first = "";
          second = "";
      }

      if (typeof first === 'string' && typeof second === 'string') {
        return sortDescriptor.direction === "descending" 
          ? second.localeCompare(first)
          : first.localeCompare(second);
      }

      return sortDescriptor.direction === "descending"
        ? Number(second) - Number(first)
        : Number(first) - Number(second);
    });
  }, [searchQuery, selectedStatus, selectedSource, selectedAgent, dateRange, sortDescriptor]);

  const columns: TableColumnType[] = [
    { 
      name: "LEAD", 
      uid: "lead", 
      sortable: true,
    },
    { 
      name: "CONTACT INFO", 
      uid: "contact", 
      sortable: true,
    },
    { 
      name: "PROPERTY INTEREST", 
      uid: "propertyInterest", 
      sortable: true,
    },
    { 
      name: "STATUS", 
      uid: "status", 
      sortable: true,
      filterOptions: [
        { key: "all", label: "All Status" },
        { key: "new", label: "New" },
        { key: "active", label: "Active" },
        { key: "pending", label: "Pending" },
        { key: "booked", label: "Booked" },
        { key: "not_interested", label: "Not Interested" },
        { key: "closed", label: "Closed" },
      ]
    },
    { 
      name: "ASSIGNED TO", 
      uid: "assignedTo", 
      sortable: true,
      filterOptions: [
        { key: "all", label: "All Agents" },
        { key: "1", label: "Agent #1" },
        { key: "2", label: "Agent #2" },
        { key: "unassigned", label: "Unassigned" },
      ]
    },
    { 
      name: "LAST ACTIVITY", 
      uid: "lastActivity", 
      sortable: true,
      filterOptions: [
        { key: "all", label: "All Time" },
        { key: "today", label: "Today" },
        { key: "week", label: "Last 7 Days" },
        { key: "month", label: "Last 30 Days" },
      ]
    },
    { 
      name: "ACTIONS", 
      uid: "actions", 
      width: 130
    },
  ];

  const formatDate = (dateString?: string) => {
    if (!dateString) return '-';
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const handleViewLead = (leadId: string) => {
    router.push(`/leads/${leadId}`);
  };

  const renderCell = (lead: Lead, columnKey: ColumnKey) => {
    switch (columnKey) {
      case "lead":
        return (
          <div className="flex flex-col">
            <span className="text-sm font-medium">{lead.name}</span>
            <span className="text-xs text-default-500">Budget: ₹{lead.budget.min / 100000}L - ₹{lead.budget.max / 100000}L</span>
          </div>
        );
      case "contact":
        return (
          <div className="flex flex-col">
            <span className="text-sm">{lead.email}</span>
            <span className="text-sm text-default-500">{lead.phone}</span>
          </div>
        );
      case "propertyInterest":
        return (
          <div className="flex flex-wrap gap-1">
            {lead.propertyInterest.map(id => (
              <Chip key={id} size="sm" variant="flat">
                Property #{id}
              </Chip>
            ))}
          </div>
        );
      case "status":
        return (
          <Chip
            color={statusColorMap[lead.status]}
            variant="flat"
          >
            {lead.status.replace('_', ' ')}
          </Chip>
        );
      case "assignedTo":
        return lead.assignedTo ? (
          <span className="text-sm">Agent #{lead.assignedTo}</span>
        ) : (
          <Chip size="sm" variant="flat">Unassigned</Chip>
        );
      case "lastActivity":
        return (
          <div className="flex flex-col">
            <span className="text-sm">Last: {formatDate(lead.lastContact)}</span>
            <span className="text-sm text-default-500">Next: {formatDate(lead.nextFollowup)}</span>
          </div>
        );
      case "actions":
        return (
          <div className="flex gap-2">
            <Button 
              isIconOnly 
              size="sm"
              variant="flat"
              aria-label="View lead"
              onClick={() => handleViewLead(lead.id)}
            >
              <EyeIcon className="w-4 h-4" />
            </Button>
            <Button 
              isIconOnly 
              size="sm"
              variant="flat"
              aria-label="Edit lead"
            >
              <PencilIcon className="w-4 h-4" />
            </Button>
            <Button 
              isIconOnly 
              size="sm"
              variant="flat"
              color="danger"
              aria-label="Delete lead"
            >
              <TrashIcon className="w-4 h-4" />
            </Button>
            <Button 
              isIconOnly 
              size="sm"
              variant="flat"
              aria-label="Add note"
            >
              <ChatBubbleLeftIcon className="w-4 h-4" />
            </Button>
          </div>
        );
      default:
        return null;
    }
  };

  const selectedCount = Array.from(selectedLeads).length;

  const onSelectionChange = (keys: Selection) => {
    setSelectedLeads(keys);
  };

  const onSortChange = (descriptor: SortDescriptor) => {
    setSortDescriptor(descriptor);
  };

  const onStatusChange = (keys: Selection) => {
    setSelectedStatus(keys);
  };

  const onAgentChange = (keys: Selection) => {
    setSelectedAgent(keys);
    // Add filtering logic here
    console.log('Agent filter changed:', keys);
  };

  const onDateRangeChange = (keys: Selection) => {
    setDateRange(keys);
    // Add date filtering logic here
    console.log('Date range changed:', keys);
  };

  const handleRowsPerPageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = parseInt(e.target.value);
    // Add pagination logic here
    console.log('Rows per page changed:', value);
  };

  const handleNewLeadSubmit = () => {
    // TODO: Implement lead creation
    console.log('New Lead:', newLead);
    setIsNewLeadModalOpen(false);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6 p-6">
        {/* Top Header */}
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Leads Dashboard</h1>
          <div className="flex gap-4">
            {selectedCount > 0 && (
              <Dropdown>
                <DropdownTrigger>
                  <Button 
                    variant="flat"
                    startContent={<EllipsisVerticalIcon className="w-4 h-4" />}
                  >
                    Bulk Actions ({selectedCount})
                  </Button>
                </DropdownTrigger>
                <DropdownMenu aria-label="Bulk actions">
                  <DropdownItem key="assign" startContent={<UserGroupIcon className="w-4 h-4" />}>
                    Assign to Agent
                  </DropdownItem>
                  <DropdownItem key="export" startContent={<ArrowDownTrayIcon className="w-4 h-4" />}>
                    Export Selected
                  </DropdownItem>
                  <DropdownItem 
                    key="delete"
                    startContent={<TrashIcon className="w-4 h-4" />}
                    className="text-danger"
                    color="danger"
                  >
                    Delete Selected
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            )}
            <Button 
              color="primary"
              startContent={<PlusIcon className="w-4 h-4" />}
              onClick={() => setIsNewLeadModalOpen(true)}
            >
              New Lead
            </Button>
          </div>
        </div>

        {/* Lead Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardBody>
              <h3 className="text-sm font-medium text-muted-foreground">Total Leads</h3>
              <p className="text-2xl font-bold">{leadStats.totalLeads}</p>
            </CardBody>
          </Card>
          <Card>
            <CardBody>
              <h3 className="text-sm font-medium text-muted-foreground">Active Leads</h3>
              <p className="text-2xl font-bold">{leadStats.activeLeads}</p>
            </CardBody>
          </Card>
          <Card>
            <CardBody>
              <h3 className="text-sm font-medium text-muted-foreground">Pending Follow-Up</h3>
              <p className="text-2xl font-bold">{leadStats.pendingLeads}</p>
            </CardBody>
          </Card>
          <Card>
            <CardBody>
              <h3 className="text-sm font-medium text-muted-foreground">Closed Leads</h3>
              <p className="text-2xl font-bold">{leadStats.closedLeads}</p>
            </CardBody>
          </Card>
        </div>

        {/* Leads Table */}
        <Card>
          <CardBody>
            <div className="flex justify-between items-center mb-4">
              <div className="flex gap-3">
                <Dropdown>
                  <DropdownTrigger>
                    <Button 
                      variant="flat" 
                      startContent={<FunnelIcon className="w-4 h-4" />}
                    >
                      Filters
                    </Button>
                  </DropdownTrigger>
                  <DropdownMenu aria-label="Filter options">
                    <Select
                      label="Source"
                      placeholder="Filter by source"
                      selectedKeys={selectedSource}
                      className="min-w-[200px]"
                      onSelectionChange={onStatusChange}
                    >
                      <SelectItem key="all" value="all">All Sources</SelectItem>
                      <SelectItem key="website" value="website">Website</SelectItem>
                      <SelectItem key="mobile_app" value="mobile_app">Mobile App</SelectItem>
                      <SelectItem key="direct_call" value="direct_call">Direct Call</SelectItem>
                      <SelectItem key="partner_referral" value="partner_referral">Partner Referral</SelectItem>
                      <SelectItem key="other" value="other">Other</SelectItem>
                    </Select>
                    <Select
                      label="Assigned To"
                      placeholder="Filter by agent"
                      selectedKeys={selectedAgent}
                      className="min-w-[200px]"
                      onSelectionChange={onAgentChange}
                    >
                      <SelectItem key="all" value="all">All Agents</SelectItem>
                      <SelectItem key="1" value="1">Agent #1</SelectItem>
                      <SelectItem key="2" value="2">Agent #2</SelectItem>
                      <SelectItem key="unassigned" value="unassigned">Unassigned</SelectItem>
                    </Select>
                    <Select
                      label="Date Range"
                      placeholder="Filter by date"
                      selectedKeys={dateRange}
                      className="min-w-[200px]"
                      onSelectionChange={onDateRangeChange}
                    >
                      <SelectItem key="all" value="all">All Time</SelectItem>
                      <SelectItem key="today" value="today">Today</SelectItem>
                      <SelectItem key="week" value="week">Last 7 Days</SelectItem>
                      <SelectItem key="month" value="month">Last 30 Days</SelectItem>
                    </Select>
                    <Select
                      label="Rows per page"
                      className="w-32"
                      onChange={handleRowsPerPageChange}
                    >
                      <SelectItem key="10" value="10">10</SelectItem>
                      <SelectItem key="20" value="20">20</SelectItem>
                      <SelectItem key="50" value="50">50</SelectItem>
                    </Select>
                  </DropdownMenu>
                </Dropdown>
              </div>
              <Input
                placeholder="Search leads..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                startContent={<MagnifyingGlassIcon className="w-3.5 h-3.5 text-default-400" />}
                size="sm"
                className="w-64"
                classNames={{
                  input: "text-small",
                  inputWrapper: "h-8",
                }}
              />
            </div>
            <Table 
              aria-label="Leads table"
              selectionMode="multiple"
              selectedKeys={selectedLeads}
              onSelectionChange={onSelectionChange}
              sortDescriptor={sortDescriptor}
              onSortChange={onSortChange}
              topContent={null}
            >
              <TableHeader columns={columns}>
                {(column) => (
                  <TableColumn 
                    key={column.uid}
                    align={column.uid === "actions" ? "center" : "start"}
                    width={column.width}
                    allowsSorting={column.sortable}
                  >
                    {column.name}
                  </TableColumn>
                )}
              </TableHeader>
              <TableBody items={sortedAndFilteredLeads}>
                {(lead) => (
                  <TableRow key={lead.id}>
                    {(columnKey) => (
                      <TableCell>
                        {renderCell(lead, columnKey as ColumnKey)}
                      </TableCell>
                    )}
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardBody>
        </Card>

        {/* New Lead Modal */}
        <Modal 
          isOpen={isNewLeadModalOpen} 
          onClose={() => setIsNewLeadModalOpen(false)}
          size="3xl"
        >
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">
                  Add New Lead
                </ModalHeader>
                <ModalBody>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                      label="Name"
                      placeholder="Enter lead name"
                      value={newLead.name}
                      onChange={(e) => setNewLead(prev => ({ ...prev, name: e.target.value }))}
                    />
                    <Input
                      type="email"
                      label="Email"
                      placeholder="Enter email address"
                      value={newLead.email}
                      onChange={(e) => setNewLead(prev => ({ ...prev, email: e.target.value }))}
                    />
                    <Input
                      type="tel"
                      label="Phone"
                      placeholder="Enter phone number"
                      value={newLead.phone}
                      onChange={(e) => setNewLead(prev => ({ ...prev, phone: e.target.value }))}
                    />
                    <Select
                      label="Source"
                      placeholder="Select lead source"
                      value={newLead.source}
                      onChange={(e) => setNewLead(prev => ({ ...prev, source: e.target.value }))}
                    >
                      <SelectItem key="website" value="website">Website</SelectItem>
                      <SelectItem key="mobile_app" value="mobile_app">Mobile App</SelectItem>
                      <SelectItem key="direct_call" value="direct_call">Direct Call</SelectItem>
                      <SelectItem key="partner_referral" value="partner_referral">Partner Referral</SelectItem>
                      <SelectItem key="other" value="other">Other</SelectItem>
                    </Select>
                  </div>

                  <Divider className="my-4" />
                  
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Budget Range</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Input
                        type="number"
                        label="Minimum Budget"
                        placeholder="Enter minimum budget"
                        value={newLead.budget.min.toString()}
                        onChange={(e) => setNewLead(prev => ({ 
                          ...prev, 
                          budget: { ...prev.budget, min: parseInt(e.target.value) || 0 }
                        }))}
                        startContent={
                          <div className="pointer-events-none flex items-center">
                            <span className="text-default-400 text-small">₹</span>
                          </div>
                        }
                      />
                      <Input
                        type="number"
                        label="Maximum Budget"
                        placeholder="Enter maximum budget"
                        value={newLead.budget.max.toString()}
                        onChange={(e) => setNewLead(prev => ({ 
                          ...prev, 
                          budget: { ...prev.budget, max: parseInt(e.target.value) || 0 }
                        }))}
                        startContent={
                          <div className="pointer-events-none flex items-center">
                            <span className="text-default-400 text-small">₹</span>
                          </div>
                        }
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Requirements</h3>
                    <Select
                      label="Property Types"
                      placeholder="Select property types"
                      selectionMode="multiple"
                      value={newLead.requirements.propertyType}
                      onChange={(e) => setNewLead(prev => ({ 
                        ...prev, 
                        requirements: { 
                          ...prev.requirements, 
                          propertyType: Array.from(e.target.selectedOptions, option => option.value)
                        }
                      }))}
                    >
                      <SelectItem key="apartment" value="apartment">Apartment</SelectItem>
                      <SelectItem key="house" value="house">House</SelectItem>
                      <SelectItem key="villa" value="villa">Villa</SelectItem>
                      <SelectItem key="commercial" value="commercial">Commercial</SelectItem>
                    </Select>

                    <Select
                      label="Preferred Locations"
                      placeholder="Select locations"
                      selectionMode="multiple"
                      value={newLead.requirements.location}
                      onChange={(e) => setNewLead(prev => ({ 
                        ...prev, 
                        requirements: { 
                          ...prev.requirements, 
                          location: Array.from(e.target.selectedOptions, option => option.value)
                        }
                      }))}
                    >
                      <SelectItem key="andheri" value="Andheri">Andheri</SelectItem>
                      <SelectItem key="bandra" value="Bandra">Bandra</SelectItem>
                      <SelectItem key="powai" value="Powai">Powai</SelectItem>
                      <SelectItem key="thane" value="Thane">Thane</SelectItem>
                    </Select>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <Input
                        type="number"
                        label="Min. Bedrooms"
                        placeholder="Enter minimum bedrooms"
                        value={newLead.requirements.minBedrooms?.toString() || ''}
                        onChange={(e) => setNewLead(prev => ({ 
                          ...prev, 
                          requirements: { 
                            ...prev.requirements, 
                            minBedrooms: parseInt(e.target.value) || undefined 
                          }
                        }))}
                      />
                      <Input
                        type="number"
                        label="Min. Bathrooms"
                        placeholder="Enter minimum bathrooms"
                        value={newLead.requirements.minBathrooms?.toString() || ''}
                        onChange={(e) => setNewLead(prev => ({ 
                          ...prev, 
                          requirements: { 
                            ...prev.requirements, 
                            minBathrooms: parseInt(e.target.value) || undefined 
                          }
                        }))}
                      />
                      <Input
                        type="number"
                        label="Min. Area (sq ft)"
                        placeholder="Enter minimum area"
                        value={newLead.requirements.minArea?.toString() || ''}
                        onChange={(e) => setNewLead(prev => ({ 
                          ...prev, 
                          requirements: { 
                            ...prev.requirements, 
                            minArea: parseInt(e.target.value) || undefined 
                          }
                        }))}
                      />
                    </div>
                  </div>
                </ModalBody>
                <ModalFooter>
                  <Button variant="flat" onPress={onClose}>
                    Cancel
                  </Button>
                  <Button color="primary" onPress={handleNewLeadSubmit}>
                    Add Lead
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