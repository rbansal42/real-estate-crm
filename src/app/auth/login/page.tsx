"use client";

import { Card, CardBody, Input, Button } from "@nextui-org/react";
import { useForm } from "react-hook-form";
import { useAuthStore } from "@/store/useAuthStore";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/constants/app.constants";
import { useState } from "react";

type LoginForm = {
  email: string;
  password: string;
};

export default function LoginPage() {
  const { register, handleSubmit, formState: { errors } } = useForm<LoginForm>();
  const { setAuth } = useAuthStore();
  const router = useRouter();
  const [loginError, setLoginError] = useState<string>("");

  const onSubmit = (data: LoginForm) => {
    setLoginError(""); // Reset error on new attempt
    
    // Email validation
    if (!data.email.includes("@")) {
      setLoginError("Please enter a valid email address");
      return;
    }

    // Password validation
    if (data.password.length < 6) {
      setLoginError("Password must be at least 6 characters long");
      return;
    }

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
    } else {
      setLoginError("Invalid email or password");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-transparent">
      <Card className="w-full max-w-md bg-background/70 backdrop-blur-md">
        <CardBody className="gap-4">
          <h1 className="text-2xl font-bold text-center mb-4">PropDekho CRM</h1>
          {loginError && (
            <div className="bg-danger-50 border border-danger-200 text-danger-600 px-4 py-2 rounded-lg text-sm">
              {loginError}
            </div>
          )}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <Input
              {...register("email")}
              label="Email"
              type="email"
              defaultValue="admin@propdekho.com"
              isInvalid={!!errors.email}
              errorMessage={errors.email?.message}
              classNames={{
                input: "bg-transparent",
                inputWrapper: "bg-transparent",
              }}
            />
            <Input
              {...register("password")}
              label="Password"
              type="password"
              defaultValue="admin123"
              isInvalid={!!errors.password}
              errorMessage={errors.password?.message}
              classNames={{
                input: "bg-transparent",
                inputWrapper: "bg-transparent",
              }}
            />
            <Button 
              type="submit" 
              color="primary" 
              className="w-full"
            >
              Login
            </Button>
          </form>
        </CardBody>
      </Card>
    </div>
  );
} 