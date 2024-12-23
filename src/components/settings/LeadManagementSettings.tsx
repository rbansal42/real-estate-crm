"use client";

import {
  Card,
  CardBody,
  Switch,
  Select,
  SelectItem,
  Input,
  Button,
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
} from "@nextui-org/react";
import { 
  UserGroupIcon, 
  ArrowPathIcon,
  ClockIcon,
} from "@heroicons/react/24/outline";
import { useState } from "react";

const leadSources = [
  { value: 'website', label: 'Website' },
  { value: 'mobile_app', label: 'Mobile App' },
  { value: 'direct_call', label: 'Direct Call' },
  { value: 'partner_referral', label: 'Partner Referral' },
];

export default function LeadManagementSettings() {
  const [autoAssign, setAutoAssign] = useState(true);
  const [roundRobin, setRoundRobin] = useState(true);
  const [followupDays, setFollowupDays] = useState(3);

  const rules = [
    { id: 1, source: 'website', assignTo: 'Team Lead', priority: 'High' },
    { id: 2, source: 'mobile_app', assignTo: 'Available Agent', priority: 'Medium' },
    { id: 3, source: 'direct_call', assignTo: 'Senior Agent', priority: 'High' },
  ];

  return (
    <div className="space-y-6 p-4">
      <div className="flex items-center gap-4">
        <UserGroupIcon className="w-8 h-8" />
        <div>
          <h2 className="text-lg font-semibold">Lead Management</h2>
          <p className="text-sm text-gray-400">
            Configure lead distribution and follow-up rules
          </p>
        </div>
      </div>

      <Card className="bg-background/70 backdrop-blur-md">
        <CardBody>
          <h3 className="text-md font-semibold mb-4">Automation Settings</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="font-medium">Auto-assign Leads</p>
                <p className="text-sm text-gray-400">Automatically assign new leads to team members</p>
              </div>
              <Switch isSelected={autoAssign} onValueChange={setAutoAssign} />
            </div>
            
            <div className="flex justify-between items-center">
              <div>
                <p className="font-medium">Round-robin Distribution</p>
                <p className="text-sm text-gray-400">Distribute leads equally among team members</p>
              </div>
              <Switch isSelected={roundRobin} onValueChange={setRoundRobin} />
            </div>

            <div className="flex justify-between items-center">
              <div>
                <p className="font-medium">Follow-up Reminder</p>
                <p className="text-sm text-gray-400">Days before follow-up reminder</p>
              </div>
              <Input
                type="number"
                value={followupDays.toString()}
                onChange={(e) => setFollowupDays(parseInt(e.target.value))}
                className="w-24"
              />
            </div>
          </div>
        </CardBody>
      </Card>

      <Card className="bg-background/70 backdrop-blur-md">
        <CardBody>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-md font-semibold">Distribution Rules</h3>
            <Button color="primary">Add Rule</Button>
          </div>
          
          <Table aria-label="Lead distribution rules">
            <TableHeader>
              <TableColumn>SOURCE</TableColumn>
              <TableColumn>ASSIGN TO</TableColumn>
              <TableColumn>PRIORITY</TableColumn>
              <TableColumn>ACTIONS</TableColumn>
            </TableHeader>
            <TableBody items={rules}>
              {(rule) => (
                <TableRow key={rule.id}>
                  <TableCell>{rule.source}</TableCell>
                  <TableCell>{rule.assignTo}</TableCell>
                  <TableCell>{rule.priority}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button isIconOnly size="sm">
                        <ArrowPathIcon className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardBody>
      </Card>
    </div>
  );
} 