import { betterAuth, type BetterAuthPlugin } from "better-auth";
import { APIError } from "better-auth/api";
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
  plugins: [disableSignUp(), openAPI()],
});

function disableSignUp() {
  return {
    id: "disable-sign-up-plugin",
    hooks: {
      before: [
        {
          matcher: (c) => c.path.startsWith("/sign-up"),
          handler: async () => {
            throw new APIError("UNAUTHORIZED", {
              message: "Sign up is disabled",
            });
          },
        },
      ],
    },
  } satisfies BetterAuthPlugin;
}
