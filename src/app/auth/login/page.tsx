"use client";

import { Card, CardBody, Input, Button } from "@nextui-org/react";
import { useForm } from "react-hook-form";
import { useAuthStore } from "@/store/useAuthStore";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/constants/app.constants";

export default function LoginPage() {
  const { register, handleSubmit } = useForm();
  const { setAuth } = useAuthStore();
  const router = useRouter();

  const onSubmit = (data: any) => {
    // Dummy authentication
    if (data.email === "admin@propdekho.com" && data.password === "admin123") {
      setAuth(
        {
          id: "1",
          email: data.email,
          name: "Admin User",
          role: "admin",
        },
        "dummy-token"
      );
      router.push(ROUTES.DASHBOARD);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-transparent">
      <Card className="w-full max-w-md">
        <CardBody className="gap-4">
          <h1 className="text-2xl font-bold text-center mb-4">PropDekho CRM</h1>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <Input
              {...register("email")}
              label="Email"
              type="email"
              defaultValue="admin@propdekho.com"
            />
            <Input
              {...register("password")}
              label="Password"
              type="password"
              defaultValue="admin123"
            />
            <Button type="submit" color="primary" className="w-full">
              Login
            </Button>
          </form>
        </CardBody>
      </Card>
    </div>
  );
} 