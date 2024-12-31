import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { AdminCreateSchema } from "@/lib/validations/auth"
import { logger } from "@/lib/logger"
import { AdminCreateData } from "@/lib/types/auth"
import { Loader2 } from "lucide-react"

interface CreateAdminFormProps {
  onSubmit: (data: AdminCreateData) => Promise<void>
  isLoading: boolean
}

export function CreateAdminForm({ onSubmit, isLoading }: CreateAdminFormProps) {
  const form = useForm<AdminCreateData>({
    resolver: zodResolver(AdminCreateSchema),
    defaultValues: {
      email: "",
      password: "",
      fullName: "",
      role: "admin",
      permissions: {
        manageTeam: true,
        manageLeads: true,
        manageProperties: true,
        viewReports: true,
        settings: true,
      },
    },
  })

  const handleSubmit = async (data: AdminCreateData) => {
    try {
      logger.info("Creating admin account", { email: data.email })
      await onSubmit(data)
      form.reset()
    } catch (error) {
      logger.error("Error creating admin account", { error })
      // Error will be handled by the parent component
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="fullName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full Name</FormLabel>
              <FormControl>
                <Input placeholder="John Doe" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" placeholder="admin@example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="••••••••••••" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Creating Admin...
            </>
          ) : (
            "Create Admin Account"
          )}
        </Button>
      </form>
    </Form>
  )
} 