import { z } from "zod"

export const AdminCreateSchema = z.object({
  email: z
    .string()
    .email("Please enter a valid email address")
    .refine(
      (email) => !email.endsWith("@tempmail.com"), // Add more disposable email domains as needed
      "Disposable email addresses are not allowed"
    ),
  password: z
    .string()
    .min(12, "Password must be at least 12 characters")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
      "Password must contain uppercase, lowercase, number, and special character"
    ),
  fullName: z
    .string()
    .min(2, "Full name must be at least 2 characters")
    .max(50, "Full name must not exceed 50 characters"),
  role: z.literal("admin"),
  permissions: z.object({
    manageTeam: z.literal(true),
    manageLeads: z.literal(true),
    manageProperties: z.literal(true),
    viewReports: z.literal(true),
    settings: z.literal(true),
  }),
}) 