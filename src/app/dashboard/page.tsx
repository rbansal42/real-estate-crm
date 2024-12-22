"use client";

import { Card, CardBody } from "@nextui-org/react";
import DashboardLayout from "@/components/layouts/DashboardLayout";

export default function DashboardPage() {
  return (
    <DashboardLayout>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardBody>
            <h3 className="text-lg font-semibold">Total Properties</h3>
            <p className="text-3xl font-bold">156</p>
          </CardBody>
        </Card>
        <Card>
          <CardBody>
            <h3 className="text-lg font-semibold">Active Leads</h3>
            <p className="text-3xl font-bold">43</p>
          </CardBody>
        </Card>
        <Card>
          <CardBody>
            <h3 className="text-lg font-semibold">Revenue</h3>
            <p className="text-3xl font-bold">₹45.2L</p>
          </CardBody>
        </Card>
      </div>
    </DashboardLayout>
  );
} 