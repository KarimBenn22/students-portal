import { clsx, type ClassValue } from "clsx";
import { headers } from "next/headers";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function withHeaders(){
  const incomingHeaders = await headers();
  const headerObject: Record<string, string> = {};
  incomingHeaders.forEach((value, key) => {
    headerObject[key] = value;
  });
  return headerObject;
}
