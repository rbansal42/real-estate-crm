"use client";

import {
  BeakerIcon,
  BanknotesIcon,
  MapPinIcon,
  HeartIcon,
  ShareIcon,
  EyeIcon,
  PencilIcon,
  HomeIcon,
  HomeModernIcon,
  Square3Stack3DIcon,
  UserGroupIcon
} from "@heroicons/react/24/outline";
import { Card, CardBody, CardFooter, Button, Image } from "@nextui-org/react";
import { Property } from "@/types";

interface PropertyGridProps {
  properties: Property[];
  onEdit?: (property: Property) => void;
}

export default function PropertyGrid({ properties, onEdit }: PropertyGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {properties.map((property) => (
        <Card key={property.id} className="bg-background/70 backdrop-blur-md">
          <CardBody className="p-0">
            <div className="relative">
              <Image
                alt={property.title}
                className="w-full h-48 object-cover"
                src={property.images[0] || '/images/property-placeholder.jpg'}
              />
              <div className="absolute top-2 right-2 flex gap-2">
                <Button isIconOnly variant="flat" className="bg-white/20 backdrop-blur-md">
                  <HeartIcon className="w-5 h-5" />
                </Button>
                <Button isIconOnly variant="flat" className="bg-white/20 backdrop-blur-md">
                  <ShareIcon className="w-5 h-5" />
                </Button>
              </div>
            </div>
            <div className="p-4">
              <h3 className="text-lg font-semibold mb-2">{property.title}</h3>
              <div className="flex items-center gap-2 text-sm text-gray-400 mb-4">
                <MapPinIcon className="w-4 h-4" />
                <span>{property.location.address}, {property.location.city}</span>
              </div>
              <div className="grid grid-cols-4 gap-4 mb-4">
                <div className="flex flex-col items-center">
                  <HomeIcon className="w-5 h-5 mb-1" />
                  <span className="text-sm">{property.specifications.bedrooms} Beds</span>
                </div>
                <div className="flex flex-col items-center">
                  <HomeModernIcon className="w-5 h-5 mb-1" />
                  <span className="text-sm">{property.specifications.bathrooms} Baths</span>
                </div>
                <div className="flex flex-col items-center">
                  <Square3Stack3DIcon className="w-5 h-5 mb-1" />
                  <span className="text-sm">{property.specifications.area} sqft</span>
                </div>
                <div className="flex flex-col items-center">
                  <UserGroupIcon className="w-5 h-5 mb-1" />
                  <span className="text-sm">{property.specifications.parking} Cars</span>
                </div>
              </div>
            </div>
          </CardBody>
          <CardFooter className="flex justify-between items-center">
            <div>
              <span className="text-sm text-gray-400">Price</span>
              <p className="text-lg font-semibold">₹{property.price.toLocaleString()}</p>
            </div>
            <div className="flex gap-2">
              <Button isIconOnly variant="flat" onClick={() => onEdit?.(property)}>
                <PencilIcon className="w-5 h-5" />
              </Button>
              <Button isIconOnly variant="flat">
                <EyeIcon className="w-5 h-5" />
              </Button>
            </div>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
} 