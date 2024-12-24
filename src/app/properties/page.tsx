"use client";

import { Suspense } from "react";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import { dummyProperties } from "@/constants/dummyData";
import PropertiesView from "@/components/properties/PropertiesView";

export default function PropertiesPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <Suspense>
          <PropertiesView properties={dummyProperties} />
        </Suspense>
      </div>
    </DashboardLayout>
  );
} 