import { betterAuth } from "better-auth";
import { z } from "zod";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { openAPI } from "better-auth/plugins";
import { prisma } from "../db";

export const auth = betterAuth({
  appName: "Finals Portal",
  baseURL: process.env.VERCEL_URL || "http://localhost:3000",
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
    },
  },
  plugins: [openAPI()],
});
