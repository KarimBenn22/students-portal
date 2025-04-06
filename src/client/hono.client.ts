import { ApiType } from "@/api";
import { hc } from "hono/client";

export const honoClient = hc<ApiType>(
  process.env.VERCEL_URL || "http://localhost:3000"
);
