import { Metadata } from "next"
import { RegisterForm } from "@/components/auth/register-form"

export const metadata: Metadata = {
  title: "Register - PropDekho CRM",
  description: "Create a new PropDekho CRM account",
}

export default function RegisterPage() {
  return <RegisterForm />
} 