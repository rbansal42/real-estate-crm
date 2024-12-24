"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { Button, ButtonGroup } from "@nextui-org/react";
import { TableCellsIcon, Squares2X2Icon } from "@heroicons/react/24/outline";
import PropertyTable from "./PropertyTable";
import PropertyGrid from "./PropertyGrid";
import PropertyFilters from "./PropertyFilters";
import type { Property } from "@/types";

interface PropertiesViewProps {
  properties: Property[];
}

export default function PropertiesView({ properties }: PropertiesViewProps) {
  const searchParams = useSearchParams();
  const [view, setView] = useState(searchParams.get("view") || "table");

  return (
    <>
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
        <PropertyTable properties={properties} /> : 
        <PropertyGrid properties={properties} />
      }
    </>
  );
} 