import { apiClient } from "@/api/api-client";
import { paths } from "@/api/schema";
import { cookies } from "next/headers";

type SignInPayload =
  paths["/auth/signin"]["post"]["requestBody"]["content"]["application/json"];

async function signIn(payload: SignInPayload) {
  const api = apiClient();
  const { data, error } = await api.POST("/auth/signin", {
    body: payload,
  });

  return { data, error };
}

export { signIn };
