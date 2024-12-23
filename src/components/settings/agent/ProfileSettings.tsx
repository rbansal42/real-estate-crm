import {
  Card,
  CardBody,
  Input,
  Button,
  Avatar,
} from "@nextui-org/react";
import { UserIcon } from "@heroicons/react/24/outline";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const profileSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Invalid phone number"),
  bio: z.string(),
  specialization: z.string(),
});

type ProfileInput = z.infer<typeof profileSchema>;

export default function ProfileSettings() {
  const { register, handleSubmit, formState: { errors } } = useForm<ProfileInput>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: "John Doe",
      email: "john@propdekho.com",
      phone: "+91 98765 43210",
      bio: "Experienced real estate agent specializing in residential properties",
      specialization: "Residential Properties",
    }
  });

  const onSubmit = (data: ProfileInput) => {
    console.log(data);
    // TODO: Implement API call
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Avatar
          icon={<UserIcon className="w-8 h-8" />}
          classNames={{
            base: "w-20 h-20",
            icon: "w-12 h-12",
          }}
        />
        <div>
          <h2 className="text-lg font-semibold">Profile Settings</h2>
          <p className="text-sm text-gray-400">
            Manage your personal information and preferences
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Card className="bg-background/70 backdrop-blur-md">
          <CardBody className="space-y-4">
            <Input
              {...register("name")}
              label="Full Name"
              isInvalid={!!errors.name}
              errorMessage={errors.name?.message}
            />
            <Input
              {...register("email")}
              label="Email"
              isInvalid={!!errors.email}
              errorMessage={errors.email?.message}
            />
            <Input
              {...register("phone")}
              label="Phone"
              isInvalid={!!errors.phone}
              errorMessage={errors.phone?.message}
            />
            <Input
              {...register("bio")}
              label="Bio"
              isInvalid={!!errors.bio}
              errorMessage={errors.bio?.message}
            />
            <Input
              {...register("specialization")}
              label="Specialization"
              isInvalid={!!errors.specialization}
              errorMessage={errors.specialization?.message}
            />
            <Button color="primary" type="submit">
              Save Changes
            </Button>
          </CardBody>
        </Card>
      </form>
    </div>
  );
} 