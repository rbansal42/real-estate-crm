"use client";

import { 
  Input, 
  Select, 
  SelectItem, 
  Slider, 
  Chip,
  Button,
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@nextui-org/react";
import { FunnelIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

const propertyTypes = [
  { value: 'apartment', label: 'Apartment' },
  { value: 'house', label: 'House' },
  { value: 'villa', label: 'Villa' },
  { value: 'plot', label: 'Plot' },
  { value: 'commercial', label: 'Commercial' }
];

const amenities = [
  'Gym', 'Swimming Pool', 'Garden', 'Security', 
  'Power Backup', 'Parking', 'Club House', 'Kids Area'
];

export default function PropertyFilters() {
  const [filters, setFilters] = useState({
    search: '',
    type: new Set([]),
    priceRange: [0, 10000000],
    amenities: new Set([]),
    bedrooms: '',
    location: '',
    status: new Set([]),
  });

  const [activeFilters, setActiveFilters] = useState<string[]>([]);

  const handleFilterChange = (key: string, value: any) => {
    setFilters(prev => ({ ...prev, [key]: value }));
    if (!activeFilters.includes(key)) {
      setActiveFilters(prev => [...prev, key]);
    }
  };

  const removeFilter = (key: string) => {
    setFilters(prev => ({ 
      ...prev, 
      [key]: key === 'priceRange' ? [0, 10000000] : new Set([])
    }));
    setActiveFilters(prev => prev.filter(f => f !== key));
  };

  return (
    <div className="space-y-4 bg-background/60 p-4 rounded-lg backdrop-blur-sm">
      <div className="flex flex-wrap gap-4">
        <Input
          placeholder="Search properties..."
          value={filters.search}
          onChange={(e) => handleFilterChange('search', e.target.value)}
          className="max-w-xs"
          startContent={<FunnelIcon className="w-4 h-4" />}
        />

        <Select
          placeholder="Property Type"
          selectionMode="multiple"
          selectedKeys={filters.type}
          onSelectionChange={(keys) => handleFilterChange('type', keys)}
          className="max-w-xs"
        >
          {propertyTypes.map((type) => (
            <SelectItem key={type.value} value={type.value}>
              {type.label}
            </SelectItem>
          ))}
        </Select>

        <Popover placement="bottom">
          <PopoverTrigger>
            <Button variant="flat">Price Range</Button>
          </PopoverTrigger>
          <PopoverContent className="w-80">
            <div className="p-4">
              <Slider
                label="Price Range (₹)"
                step={100000}
                minValue={0}
                maxValue={10000000}
                value={filters.priceRange}
                onChange={(value) => handleFilterChange('priceRange', value)}
                formatOptions={{ style: 'currency', currency: 'INR' }}
                className="max-w-md"
              />
            </div>
          </PopoverContent>
        </Popover>

        <Select
          placeholder="Amenities"
          selectionMode="multiple"
          selectedKeys={filters.amenities}
          onSelectionChange={(keys) => handleFilterChange('amenities', keys)}
          className="max-w-xs"
        >
          {amenities.map((amenity) => (
            <SelectItem key={amenity} value={amenity}>
              {amenity}
            </SelectItem>
          ))}
        </Select>

        <Input
          placeholder="Location"
          value={filters.location}
          onChange={(e) => handleFilterChange('location', e.target.value)}
          className="max-w-xs"
        />

        <Select
          placeholder="Status"
          selectionMode="multiple"
          selectedKeys={filters.status}
          onSelectionChange={(keys) => handleFilterChange('status', keys)}
          className="max-w-xs"
        >
          <SelectItem key="available" value="available">Available</SelectItem>
          <SelectItem key="sold" value="sold">Sold</SelectItem>
          <SelectItem key="rented" value="rented">Rented</SelectItem>
          <SelectItem key="pending" value="pending">Pending</SelectItem>
        </Select>
      </div>

      {activeFilters.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {activeFilters.map((filter) => (
            <Chip
              key={filter}
              onClose={() => removeFilter(filter)}
              variant="flat"
              color="primary"
            >
              {filter.charAt(0).toUpperCase() + filter.slice(1)}
            </Chip>
          ))}
          <Button
            size="sm"
            variant="light"
            onClick={() => {
              setFilters({
                search: '',
                type: new Set([]),
                priceRange: [0, 10000000],
                amenities: new Set([]),
                bedrooms: '',
                location: '',
                status: new Set([]),
              });
              setActiveFilters([]);
            }}
          >
            Clear All
          </Button>
        </div>
      )}
    </div>
  );
} 