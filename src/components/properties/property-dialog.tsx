"use client"

import { useEffect } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Property, PropertyType, PropertyCategory, PropertyStatus, ListingType } from "@/lib/types/property"
import { logger } from "@/lib/logger"

const formSchema = z.object({
  title: z.string().min(2, {
    message: "Title must be at least 2 characters.",
  }),
  description: z.string().min(10, {
    message: "Description must be at least 10 characters.",
  }),
  type: z.enum(['apartment', 'house', 'villa', 'plot', 'commercial', 'office'] as const),
  category: z.enum(['residential', 'commercial', 'industrial', 'land'] as const),
  status: z.enum(['available', 'sold', 'rented', 'pending', 'off-market'] as const),
  listingType: z.enum(['sale', 'rent', 'lease'] as const),
  location: z.object({
    address: z.string().min(5),
    city: z.string().min(2),
    state: z.string().min(2),
    country: z.string().min(2),
    pincode: z.string().min(6),
  }),
  specifications: z.object({
    bedrooms: z.number().optional(),
    bathrooms: z.number().optional(),
    balconies: z.number().optional(),
    totalFloors: z.number().optional(),
    floorNumber: z.number().optional(),
    furnishing: z.enum(['unfurnished', 'semi-furnished', 'fully-furnished']).optional(),
    superBuiltupArea: z.number().min(1),
    carpetArea: z.number().min(1),
    parking: z.number().optional(),
    ageOfProperty: z.number().optional(),
    availableFrom: z.string(),
  }),
  pricing: z.object({
    price: z.number().min(1),
    pricePerSqFt: z.number().min(1),
    maintenanceCharges: z.number().optional(),
    bookingAmount: z.number().optional(),
    currency: z.string().default('INR'),
    negotiable: z.boolean().default(true),
  }),
  featured: z.boolean().default(false),
  verified: z.boolean().default(false),
  tags: z.array(z.string()).default([]),
});

interface PropertyDialogProps {
  property?: Property
  open: boolean
  onOpenChange: (open: boolean) => void
  onSubmit: (data: z.infer<typeof formSchema>) => void
  isSubmitting?: boolean
}

export function PropertyDialog({
  property,
  open,
  onOpenChange,
  onSubmit,
  isSubmitting = false,
}: PropertyDialogProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      type: "apartment",
      category: "residential",
      status: "available",
      listingType: "sale",
      location: {
        address: "",
        city: "",
        state: "",
        country: "India",
        pincode: "",
      },
      specifications: {
        superBuiltupArea: 0,
        carpetArea: 0,
        availableFrom: new Date().toISOString().split('T')[0],
      },
      pricing: {
        price: 0,
        pricePerSqFt: 0,
        currency: "INR",
        negotiable: true,
      },
      featured: false,
      verified: false,
      tags: [],
    },
  })

  useEffect(() => {
    if (property) {
      form.reset({
        title: property.title,
        description: property.description,
        type: property.type,
        category: property.category,
        status: property.status,
        listingType: property.listingType,
        location: property.location,
        specifications: {
          ...property.specifications,
          availableFrom: new Date(property.specifications.availableFrom).toISOString().split('T')[0],
        },
        pricing: property.pricing,
        featured: property.featured,
        verified: property.verified,
        tags: property.tags,
      })
    } else {
      form.reset({
        title: "",
        description: "",
        type: "apartment",
        category: "residential",
        status: "available",
        listingType: "sale",
        location: {
          address: "",
          city: "",
          state: "",
          country: "India",
          pincode: "",
        },
        specifications: {
          superBuiltupArea: 0,
          carpetArea: 0,
          availableFrom: new Date().toISOString().split('T')[0],
        },
        pricing: {
          price: 0,
          pricePerSqFt: 0,
          currency: "INR",
          negotiable: true,
        },
        featured: false,
        verified: false,
        tags: [],
      })
    }
  }, [property, form])

  const handleSubmit = (values: z.infer<typeof formSchema>) => {
    logger.info('Submitting property form', { values });
    onSubmit(values);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{property ? 'Edit' : 'Add'} Property</DialogTitle>
          <DialogDescription>
            {property ? 'Edit the details of an existing property.' : 'Add a new property listing.'}
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Basic Information */}
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Title</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter property title" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Enter property description"
                          className="resize-none"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="type"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Type</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select property type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="apartment">Apartment</SelectItem>
                          <SelectItem value="house">House</SelectItem>
                          <SelectItem value="villa">Villa</SelectItem>
                          <SelectItem value="plot">Plot</SelectItem>
                          <SelectItem value="commercial">Commercial</SelectItem>
                          <SelectItem value="office">Office</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Category</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select property category" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="residential">Residential</SelectItem>
                          <SelectItem value="commercial">Commercial</SelectItem>
                          <SelectItem value="industrial">Industrial</SelectItem>
                          <SelectItem value="land">Land</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="status"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Status</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select property status" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="available">Available</SelectItem>
                          <SelectItem value="sold">Sold</SelectItem>
                          <SelectItem value="rented">Rented</SelectItem>
                          <SelectItem value="pending">Pending</SelectItem>
                          <SelectItem value="off-market">Off Market</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="listingType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Listing Type</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select listing type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="sale">Sale</SelectItem>
                          <SelectItem value="rent">Rent</SelectItem>
                          <SelectItem value="lease">Lease</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Location Information */}
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="location.address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Address</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter address" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="location.city"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>City</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter city" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="location.state"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>State</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter state" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="location.country"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Country</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter country" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="location.pincode"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Pincode</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter pincode" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </div>

            {/* Specifications */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Specifications</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <FormField
                  control={form.control}
                  name="specifications.superBuiltupArea"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Super Built-up Area (sq.ft)</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="Enter area"
                          {...field}
                          onChange={e => field.onChange(Number(e.target.value))}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="specifications.carpetArea"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Carpet Area (sq.ft)</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="Enter area"
                          {...field}
                          onChange={e => field.onChange(Number(e.target.value))}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="specifications.bedrooms"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Bedrooms</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="Enter bedrooms"
                          {...field}
                          onChange={e => field.onChange(Number(e.target.value))}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="specifications.bathrooms"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Bathrooms</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="Enter bathrooms"
                          {...field}
                          onChange={e => field.onChange(Number(e.target.value))}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="specifications.balconies"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Balconies</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="Enter balconies"
                          {...field}
                          onChange={e => field.onChange(Number(e.target.value))}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="specifications.furnishing"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Furnishing</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select furnishing type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="unfurnished">Unfurnished</SelectItem>
                          <SelectItem value="semi-furnished">Semi Furnished</SelectItem>
                          <SelectItem value="fully-furnished">Fully Furnished</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* Pricing */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Pricing</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <FormField
                  control={form.control}
                  name="pricing.price"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Price</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="Enter price"
                          {...field}
                          onChange={e => field.onChange(Number(e.target.value))}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="pricing.pricePerSqFt"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Price per sq.ft</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="Enter price per sq.ft"
                          {...field}
                          onChange={e => field.onChange(Number(e.target.value))}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="pricing.maintenanceCharges"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Maintenance Charges</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="Enter maintenance charges"
                          {...field}
                          onChange={e => field.onChange(Number(e.target.value))}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <DialogFooter>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Saving...' : property ? 'Save Changes' : 'Add Property'}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
} 