"use client";

import {
  Input,
  Button,
  Avatar,
} from "@nextui-org/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { userSettingsSchema } from "@/schemas/settings.schema";
import type { z } from "zod";
import { UserCircleIcon } from "@heroicons/react/24/outline";

type UserSettingsInput = z.infer<typeof userSettingsSchema>;

export default function UserSettings() {
  const { register, handleSubmit, formState: { errors } } = useForm<UserSettingsInput>({
    resolver: zodResolver(userSettingsSchema),
    defaultValues: {
      name: "John Doe",
      email: "john@propdekho.com",
      phone: "+91 98765 43210",
      designation: "Sales Manager",
    }
  });

  const onSubmit = (data: UserSettingsInput) => {
    console.log(data);
    // TODO: Implement API call
  };

  return (
    <div className="space-y-6 p-4">
      <div className="flex items-center gap-4">
        <Avatar
          icon={<UserCircleIcon className="w-8 h-8" />}
          classNames={{
            base: "w-20 h-20",
            icon: "w-12 h-12",
          }}
        />
        <div>
          <h2 className="text-lg font-semibold">User Profile</h2>
          <p className="text-sm text-gray-400">
            Manage your personal information
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Input
          {...register("name")}
          label="Full Name"
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
          {...register("designation")}
          label="Designation"
          isInvalid={!!errors.designation}
          errorMessage={errors.designation?.message}
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