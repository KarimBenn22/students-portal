import { z } from "zod";
import { Specialty } from "@prisma/client";

export const projectInsertSchema = z.object({
  title: z.string(),
  description: z.string().optional(),
  specialty: z.nativeEnum(Specialty),
  category: z.string(),
});

export const projectUpdateSchema = projectInsertSchema.partial();
