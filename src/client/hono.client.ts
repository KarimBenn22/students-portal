import { ApiType } from "@/api";
import { hc } from "hono/client";

const baseUrl = process.env.NEXT_PUBLIC_VERCEL_URL 
  ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}` 
  : process.env.VERCEL_URL 
    ? `https://${process.env.VERCEL_URL}` 
    : "http://localhost:3000";

export const honoClient = hc<ApiType>(baseUrl);
