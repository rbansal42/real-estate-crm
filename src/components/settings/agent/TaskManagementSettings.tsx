import {
  Card,
  CardBody,
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
  Chip,
  Button,
} from "@nextui-org/react";
import { 
  CheckCircleIcon,
  ClockIcon,
  CalendarIcon,
} from "@heroicons/react/24/outline";
import { useState } from "react";

interface Task {
  id: string;
  title: string;
  type: string;
  dueDate: string;
  status: string;
  priority: string;
}

export default function TaskManagementSettings() {
  const [tasks] = useState<Task[]>([
    {
      id: "1",
      title: "Property Showing - Green Acres Villa",
      type: "Showing",
      dueDate: "2024-03-22 14:00",
      status: "Pending",
      priority: "High",
    },
    {
      id: "2",
      title: "Follow-up Call - Bob Wilson",
      type: "Call",
      dueDate: "2024-03-21 11:00",
      status: "Completed",
      priority: "Medium",
    },
  ]);

  const columns = [
    { name: "TASK", uid: "title" },
    { name: "TYPE", uid: "type" },
    { name: "DUE DATE", uid: "dueDate" },
    { name: "STATUS", uid: "status" },
    { name: "PRIORITY", uid: "priority" },
    { name: "ACTIONS", uid: "actions" },
  ];

  const renderCell = (task: Task, columnKey: React.Key) => {
    switch (columnKey) {
      case "title":
        return task.title;
      case "type":
        return (
          <Chip variant="flat" color="primary">
            {task.type}
          </Chip>
        );
      case "dueDate":
        return task.dueDate;
      case "status":
        return (
          <Chip
            color={task.status === "Completed" ? "success" : "warning"}
            variant="flat"
          >
            {task.status}
          </Chip>
        );
      case "priority":
        return (
          <Chip
            color={task.priority === "High" ? "danger" : "primary"}
            variant="flat"
          >
            {task.priority}
          </Chip>
        );
      case "actions":
        return (
          <div className="flex gap-2">
            <Button 
              isIconOnly 
              size="sm"
              variant="flat"
              color="success"
              startContent={<CheckCircleIcon className="w-4 h-4" />}
            />
            <Button 
              isIconOnly 
              size="sm"
              variant="flat"
              startContent={<CalendarIcon className="w-4 h-4" />}
            />
          </div>
        );
    }
  };

  return (
    <div className="space-y-6">
      <Card className="bg-background/70 backdrop-blur-md">
        <CardBody>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-md font-semibold">Tasks</h3>
          </div>
          
          <Table aria-label="Tasks table">
            <TableHeader columns={columns}>
              {(column) => (
                <TableColumn key={column.uid}>
                  {column.name}
                </TableColumn>
              )}
            </TableHeader>
            <TableBody items={tasks}>
              {(task) => (
                <TableRow key={task.id}>
                  {(columnKey) => (
                    <TableCell>
                      {renderCell(task, columnKey)}
                    </TableCell>
                  )}
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardBody>
      </Card>
    </div>
  );
} 