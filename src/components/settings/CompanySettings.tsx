"use client";

import {
  Input,
  Button,
  Avatar,
} from "@nextui-org/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { companySettingsSchema } from "@/schemas/settings.schema";
import type { z } from "zod";
import { BuildingOfficeIcon } from "@heroicons/react/24/outline";

type CompanySettingsInput = z.infer<typeof companySettingsSchema>;

export default function CompanySettings() {
  const { register, handleSubmit, formState: { errors } } = useForm<CompanySettingsInput>({
    resolver: zodResolver(companySettingsSchema),
    defaultValues: {
      name: "PropDekho",
      email: "contact@propdekho.com",
      phone: "+91 98765 43210",
      address: "123 Business Park, Mumbai",
      website: "https://propdekho.com",
    }
  });

  const onSubmit = (data: CompanySettingsInput) => {
    console.log(data);
    // TODO: Implement API call
  };

  return (
    <div className="space-y-6 p-4">
      <div className="flex items-center gap-4">
        <Avatar
          icon={<BuildingOfficeIcon className="w-8 h-8" />}
          classNames={{
            base: "w-20 h-20",
            icon: "w-12 h-12",
          }}
        />
        <div>
          <h2 className="text-lg font-semibold">Company Profile</h2>
          <p className="text-sm text-gray-400">
            Manage your company information and branding
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Input
          {...register("name")}
          label="Company Name"
          isInvalid={!!errors.name}
          errorMessage={errors.name?.message}
          classNames={{
            input: "bg-transparent",
            inputWrapper: "bg-transparent",
          }}
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            {...register("email")}
            label="Email"
            type="email"
            isInvalid={!!errors.email}
            errorMessage={errors.email?.message}
            classNames={{
              input: "bg-transparent",
              inputWrapper: "bg-transparent",
            }}
          />
          <Input
            {...register("phone")}
            label="Phone"
            isInvalid={!!errors.phone}
            errorMessage={errors.phone?.message}
            classNames={{
              input: "bg-transparent",
              inputWrapper: "bg-transparent",
            }}
          />
        </div>
        <Input
          {...register("address")}
          label="Address"
          isInvalid={!!errors.address}
          errorMessage={errors.address?.message}
          classNames={{
            input: "bg-transparent",
            inputWrapper: "bg-transparent",
          }}
        />
        <Input
          {...register("website")}
          label="Website"
          isInvalid={!!errors.website}
          errorMessage={errors.website?.message}
          classNames={{
            input: "bg-transparent",
            inputWrapper: "bg-transparent",
          }}
        />
        <div className="flex justify-end">
          <Button color="primary" type="submit">
            Save Changes
          </Button>
        </div>
      </form>
    </div>
  );
} 