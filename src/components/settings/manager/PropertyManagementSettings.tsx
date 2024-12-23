import {
  Card,
  CardBody,
  Button,
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
  Chip,
} from "@nextui-org/react";
import { 
  BuildingOfficeIcon,
  ArrowUpTrayIcon,
  ArrowDownTrayIcon,
} from "@heroicons/react/24/outline";
import { useState } from "react";

interface PropertyStats {
  id: string;
  category: string;
  total: number;
  active: number;
  pending: number;
  lastUpdated: string;
}

export default function PropertyManagementSettings() {
  const [propertyStats] = useState<PropertyStats[]>([
    {
      id: "1",
      category: "Residential",
      total: 120,
      active: 89,
      pending: 31,
      lastUpdated: "2024-03-20",
    },
    {
      id: "2",
      category: "Commercial",
      total: 45,
      active: 38,
      pending: 7,
      lastUpdated: "2024-03-19",
    },
  ]);

  const columns = [
    { name: "CATEGORY", uid: "category" },
    { name: "TOTAL", uid: "total" },
    { name: "ACTIVE", uid: "active" },
    { name: "PENDING", uid: "pending" },
    { name: "LAST UPDATED", uid: "lastUpdated" },
  ];

  return (
    <div className="space-y-6">
      <Card className="bg-background/70 backdrop-blur-md">
        <CardBody>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-md font-semibold">Property Overview</h3>
            <div className="flex gap-2">
              <Button 
                color="primary"
                variant="flat"
                startContent={<ArrowUpTrayIcon className="w-4 h-4" />}
              >
                Export Data
              </Button>
              <Button 
                color="primary"
                startContent={<ArrowDownTrayIcon className="w-4 h-4" />}
              >
                Bulk Import
              </Button>
            </div>
          </div>
          
          <Table aria-label="Property statistics">
            <TableHeader columns={columns}>
              {(column) => (
                <TableColumn key={column.uid}>
                  {column.name}
                </TableColumn>
              )}
            </TableHeader>
            <TableBody items={propertyStats}>
              {(stat) => (
                <TableRow key={stat.id}>
                  <TableCell>{stat.category}</TableCell>
                  <TableCell>{stat.total}</TableCell>
                  <TableCell>
                    <Chip color="success" variant="flat">
                      {stat.active}
                    </Chip>
                  </TableCell>
                  <TableCell>
                    <Chip color="warning" variant="flat">
                      {stat.pending}
                    </Chip>
                  </TableCell>
                  <TableCell>{stat.lastUpdated}</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardBody>
      </Card>
    </div>
  );
} 