import { betterAuth } from "better-auth";
import { z } from "zod";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { openAPI } from "better-auth/plugins";
import { prisma } from "../db";
import { Specialty } from "@prisma/client";

const baseUrl = process.env.NEXT_PUBLIC_VERCEL_URL 
  ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}` 
  : process.env.VERCEL_URL 
    ? `https://${process.env.VERCEL_URL}` 
    : "http://localhost:3000";

export const auth = betterAuth({
  appName: "Finals Portal",
  baseURL: baseUrl,
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  emailAndPassword: {
    enabled: true,
  },
  user: {
    additionalFields: {
      role: {
        type: "string",
        fieldName: "role",
        defaultValue: "student",
        validator: {
          input: z.enum(["student", "teacher"]),
        },
      },
      registerationNumber: {
        fieldName: "registerationNumber",
        type: "string",
        input: true,
      },
      specialty: {
        fieldName: "specialty",
        type: "string",
        input: true,
        validator: {
          input: z.nativeEnum(Specialty),
        },
      },
    },
  },
  plugins: [openAPI()],
});
