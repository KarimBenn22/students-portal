"use server";

import { headers } from "next/headers";

export async function withHeaders(){
    "use server"
    const incomingHeaders = await headers();
    const headerObject: Record<string, string> = {};
    incomingHeaders.forEach((value, key) => {
      headerObject[key] = value;
    });
    return headerObject;
  }