"use client";

import {
  Card,
  CardBody,
  Input,
  Button,
  Switch,
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
} from "@nextui-org/react";
import { 
  ShieldCheckIcon,
  KeyIcon,
  DevicePhoneMobileIcon,
} from "@heroicons/react/24/outline";
import { useState } from "react";

export default function SecuritySettings() {
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [sessionTimeout, setSessionTimeout] = useState(30);

  const devices = [
    { 
      id: 1, 
      device: 'Chrome on Windows',
      location: 'Mumbai, India',
      lastAccess: '2024-03-20 14:30:00',
      status: 'active'
    },
    { 
      id: 2, 
      device: 'Safari on iPhone',
      location: 'Delhi, India',
      lastAccess: '2024-03-19 09:15:00',
      status: 'active'
    },
  ];

  return (
    <div className="space-y-6 p-4">
      <div className="flex items-center gap-4">
        <ShieldCheckIcon className="w-8 h-8" />
        <div>
          <h2 className="text-lg font-semibold">Security Settings</h2>
          <p className="text-sm text-gray-400">
            Manage your account security and authentication
          </p>
        </div>
      </div>

      <Card className="bg-background/70 backdrop-blur-md">
        <CardBody>
          <h3 className="text-md font-semibold mb-4">Password</h3>
          <form className="space-y-4">
            <Input
              type="password"
              label="Current Password"
              className="max-w-md"
            />
            <Input
              type="password"
              label="New Password"
              className="max-w-md"
            />
            <Input
              type="password"
              label="Confirm New Password"
              className="max-w-md"
            />
            <Button color="primary" startContent={<KeyIcon className="w-4 h-4" />}>
              Change Password
            </Button>
          </form>
        </CardBody>
      </Card>

      <Card className="bg-background/70 backdrop-blur-md">
        <CardBody>
          <h3 className="text-md font-semibold mb-4">Two-Factor Authentication</h3>
          <div className="flex justify-between items-center mb-4">
            <div>
              <p className="font-medium">Enable 2FA</p>
              <p className="text-sm text-gray-400">Add an extra layer of security to your account</p>
            </div>
            <Switch 
              isSelected={twoFactorEnabled}
              onValueChange={setTwoFactorEnabled}
            />
          </div>
          {twoFactorEnabled && (
            <div className="mt-4">
              <Button 
                color="primary" 
                variant="flat"
                startContent={<DevicePhoneMobileIcon className="w-4 h-4" />}
              >
                Setup Authenticator App
              </Button>
            </div>
          )}
        </CardBody>
      </Card>

      <Card className="bg-background/70 backdrop-blur-md">
        <CardBody>
          <h3 className="text-md font-semibold mb-4">Active Sessions</h3>
          <Table aria-label="Active sessions">
            <TableHeader>
              <TableColumn>DEVICE</TableColumn>
              <TableColumn>LOCATION</TableColumn>
              <TableColumn>LAST ACCESS</TableColumn>
              <TableColumn>STATUS</TableColumn>
            </TableHeader>
            <TableBody items={devices}>
              {(device) => (
                <TableRow key={device.id}>
                  <TableCell>{device.device}</TableCell>
                  <TableCell>{device.location}</TableCell>
                  <TableCell>{device.lastAccess}</TableCell>
                  <TableCell>
                    <Button size="sm" color="danger" variant="flat">
                      Revoke
                    </Button>
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