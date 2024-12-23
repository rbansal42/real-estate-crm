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
  User,
  Chip,
  Input,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Selection,
  Checkbox,
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

export default function LeadsPage() {
  const [selectedStatus, setSelectedStatus] = useState<Selection>(new Set(["all"]));
  const [selectedSource, setSelectedSource] = useState<Selection>(new Set(["all"]));
  const [selectedAgent, setSelectedAgent] = useState<Selection>(new Set(["all"]));
  const [dateRange, setDateRange] = useState<Selection>(new Set(["all"]));
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLeads, setSelectedLeads] = useState<Selection>(new Set([]));

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

  // Filter leads based on selected filters
  const filteredLeads = useMemo(() => {
    return dummyLeads.filter(lead => {
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
  }, [searchQuery, selectedStatus, selectedSource, selectedAgent, dateRange]);

  const columns = [
    { name: "LEAD", uid: "lead" },
    { name: "CONTACT INFO", uid: "contact" },
    { name: "PROPERTY INTEREST", uid: "propertyInterest" },
    { name: "STATUS", uid: "status" },
    { name: "ASSIGNED TO", uid: "assignedTo" },
    { name: "LAST ACTIVITY", uid: "lastActivity" },
    { name: "ACTIONS", uid: "actions", width: "130px" },
  ];

  const formatDate = (dateString?: string) => {
    if (!dateString) return '-';
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const renderCell = (lead: Lead, columnKey: React.Key) => {
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

        {/* Search and Filters */}
        <div className="flex flex-col gap-4">
          <div className="flex gap-4">
            <Input
              placeholder="Search leads..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              startContent={<MagnifyingGlassIcon className="w-4 h-4 text-default-400" />}
              className="w-96"
            />
            <Button 
              variant="flat" 
              startContent={<FunnelIcon className="w-4 h-4" />}
            >
              More Filters
            </Button>
          </div>
          
          <div className="flex gap-4 flex-wrap">
            <Select
              label="Status"
              placeholder="Filter by status"
              selectedKeys={selectedStatus}
              className="max-w-xs"
              onSelectionChange={setSelectedStatus}
            >
              <SelectItem key="all" value="all">All Status</SelectItem>
              <SelectItem key="new" value="new">New</SelectItem>
              <SelectItem key="active" value="active">Active</SelectItem>
              <SelectItem key="pending" value="pending">Pending</SelectItem>
              <SelectItem key="booked" value="booked">Booked</SelectItem>
              <SelectItem key="not_interested" value="not_interested">Not Interested</SelectItem>
              <SelectItem key="closed" value="closed">Closed</SelectItem>
            </Select>

            <Select
              label="Source"
              placeholder="Filter by source"
              selectedKeys={selectedSource}
              className="max-w-xs"
              onSelectionChange={setSelectedSource}
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
              className="max-w-xs"
              onSelectionChange={setSelectedAgent}
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
              className="max-w-xs"
              onSelectionChange={setDateRange}
            >
              <SelectItem key="all" value="all">All Time</SelectItem>
              <SelectItem key="today" value="today">Today</SelectItem>
              <SelectItem key="week" value="week">Last 7 Days</SelectItem>
              <SelectItem key="month" value="month">Last 30 Days</SelectItem>
            </Select>
          </div>
        </div>

        {/* Leads Table */}
        <Card>
          <CardBody>
            <Table 
              aria-label="Leads table"
              selectionMode="multiple"
              selectedKeys={selectedLeads}
              onSelectionChange={setSelectedLeads as any}
            >
              <TableHeader columns={columns}>
                {(column) => (
                  <TableColumn 
                    key={column.uid}
                    align={column.uid === "actions" ? "center" : "start"}
                    width={column.width as any}
                  >
                    {column.name}
                  </TableColumn>
                )}
              </TableHeader>
              <TableBody items={filteredLeads}>
                {(lead) => (
                  <TableRow key={lead.id}>
                    {(columnKey) => (
                      <TableCell>
                        {renderCell(lead, columnKey)}
                      </TableCell>
                    )}
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardBody>
        </Card>
      </div>
    </DashboardLayout>
  );
} 