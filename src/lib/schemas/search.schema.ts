import { Specialty } from "@prisma/client";
import { z } from "zod";

export const searchQuerySchema = z.object({
  q: z.string().optional(),
  page: z.number().int().positive().default(1),
  limit: z.number().int().positive().default(10),
});

export const projectsSearchSchema = searchQuerySchema.extend({
  category: z.string().optional(),
  specialty: z.nativeEnum(Specialty).optional(),
});
