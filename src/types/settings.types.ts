import { z } from "zod";
import { companySettingsSchema } from "@/schemas/settings.schema";

export type CompanySettingsInput = z.infer<typeof companySettingsSchema>; 