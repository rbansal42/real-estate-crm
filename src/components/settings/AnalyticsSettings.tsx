"use client";

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
} from "@nextui-org/react";
import { 
  ChartBarIcon,
  ArrowDownTrayIcon,
  CalendarIcon,
} from "@heroicons/react/24/outline";
import { useState } from "react";

const reportTypes = [
  { value: 'property_performance', label: 'Property Performance' },
  { value: 'lead_conversion', label: 'Lead Conversion' },
  { value: 'team_performance', label: 'Team Performance' },
  { value: 'revenue_analysis', label: 'Revenue Analysis' },
];

export default function AnalyticsSettings() {
  const [selectedReport, setSelectedReport] = useState<string>('property_performance');
  const [timeframe, setTimeframe] = useState<string>('last_30_days');

  const scheduledReports = [
    { 
      id: 1, 
      name: 'Monthly Property Report', 
      frequency: 'Monthly',
      recipients: 'management@propdekho.com',
      format: 'Excel'
    },
    { 
      id: 2, 
      name: 'Weekly Lead Analysis', 
      frequency: 'Weekly',
      recipients: 'sales@propdekho.com',
      format: 'CSV'
    },
  ];

  return (
    <div className="space-y-6 p-4">
      <div className="flex items-center gap-4">
        <ChartBarIcon className="w-8 h-8" />
        <div>
          <h2 className="text-lg font-semibold">Reports & Analytics</h2>
          <p className="text-sm text-gray-400">
            Generate and schedule reports for your business
          </p>
        </div>
      </div>

      <Card className="bg-background/70 backdrop-blur-md">
        <CardBody>
          <h3 className="text-md font-semibold mb-4">Generate Report</h3>
          <div className="flex gap-4 mb-4">
            <Select 
              label="Report Type"
              selectedKeys={[selectedReport]}
              onChange={(e) => setSelectedReport(e.target.value)}
              className="max-w-xs"
            >
              {reportTypes.map((type) => (
                <SelectItem key={type.value} value={type.value}>
                  {type.label}
                </SelectItem>
              ))}
            </Select>

            <Select 
              label="Timeframe"
              selectedKeys={[timeframe]}
              onChange={(e) => setTimeframe(e.target.value)}
              className="max-w-xs"
            >
              <SelectItem key="last_7_days">Last 7 Days</SelectItem>
              <SelectItem key="last_30_days">Last 30 Days</SelectItem>
              <SelectItem key="last_90_days">Last 90 Days</SelectItem>
              <SelectItem key="custom">Custom Range</SelectItem>
            </Select>

            <Button 
              color="primary"
              startContent={<ArrowDownTrayIcon className="w-4 h-4" />}
            >
              Generate Report
            </Button>
          </div>
        </CardBody>
      </Card>

      <Card className="bg-background/70 backdrop-blur-md">
        <CardBody>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-md font-semibold">Scheduled Reports</h3>
            <Button color="primary">Schedule New</Button>
          </div>
          
          <Table aria-label="Scheduled reports">
            <TableHeader>
              <TableColumn>REPORT NAME</TableColumn>
              <TableColumn>FREQUENCY</TableColumn>
              <TableColumn>RECIPIENTS</TableColumn>
              <TableColumn>FORMAT</TableColumn>
              <TableColumn>ACTIONS</TableColumn>
            </TableHeader>
            <TableBody items={scheduledReports}>
              {(report) => (
                <TableRow key={report.id}>
                  <TableCell>{report.name}</TableCell>
                  <TableCell>{report.frequency}</TableCell>
                  <TableCell>{report.recipients}</TableCell>
                  <TableCell>{report.format}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button isIconOnly size="sm">
                        <CalendarIcon className="w-4 h-4" />
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