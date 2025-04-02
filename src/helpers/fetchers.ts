import { apiClient } from "@/api/api-client";
import { paths } from "@/api/schema";

type SignInPayload =
  paths["/auth/signin"]["post"]["requestBody"]["content"]["application/json"];

async function signIn(payload: SignInPayload) {
  const api = apiClient();
  const response = await api.POST("/auth/signin", {
    body: payload,
  });
  return response;
}

export { signIn };
