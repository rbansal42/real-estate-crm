import { Metadata } from "next"
import { LoginForm } from "@/components/auth/login-form"

export const metadata: Metadata = {
  title: "Login - PropDekho CRM",
  description: "Login to your PropDekho CRM account",
}

export default function LoginPage() {
  return <LoginForm />
} 