"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { Button, ButtonGroup } from "@nextui-org/react";
import { TableCellsIcon, Squares2X2Icon } from "@heroicons/react/24/outline";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import PropertyTable from "@/components/properties/PropertyTable";
import PropertyGrid from "@/components/properties/PropertyGrid";
import PropertyFilters from "@/components/properties/PropertyFilters";
import { dummyProperties } from "@/constants/dummyData";

export default function PropertiesPage() {
  const searchParams = useSearchParams();
  const [view, setView] = useState(searchParams.get("view") || "table");

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Properties</h1>
          <ButtonGroup variant="flat">
            <Button
              isIconOnly
              onPress={() => setView("table")}
              className={view === "table" ? "bg-primary/20" : ""}
            >
              <TableCellsIcon className="w-5 h-5" />
            </Button>
            <Button
              isIconOnly
              onPress={() => setView("card")}
              className={view === "card" ? "bg-primary/20" : ""}
            >
              <Squares2X2Icon className="w-5 h-5" />
            </Button>
          </ButtonGroup>
        </div>

        <PropertyFilters />
        
        {view === "table" ? 
          <PropertyTable properties={dummyProperties} /> : 
          <PropertyGrid properties={dummyProperties} />
        }
      </div>
    </DashboardLayout>
  );
} 