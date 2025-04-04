import { betterAuth, } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { openAPI } from "better-auth/plugins";
import { prisma } from "../db";
import { nanoid } from "nanoid";

export const auth = betterAuth({
  appName: "Finals Portal",
  basePath: "/api/teacher/auth",
  baseURL: process.env.VERCEL_URL || "http://localhost:3000",
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  emailAndPassword: {
    enabled: true,
  },
  user: {
    modelName: "teacher",
  },
  advanced: {
    generateId: () => {
      return `teacher_${nanoid()}`;
    },
  },
  plugins: [openAPI()],
});
