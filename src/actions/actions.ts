"use server";
import { apiClient } from "@/api/api-client";
import { paths } from "@/api/schema";
import { headers, cookies } from "next/headers";

// Sign in
type SignInPayload =
  paths["/auth/signin"]["post"]["requestBody"]["content"]["application/json"];

async function signIn(payload: SignInPayload) {
  const headersStore = await headers();
  const cookiesStore = await cookies();

  const api = apiClient();
  const { data, error } = await api.POST("/auth/signin", {
    body: payload,
    headers: {
      Cookies: headersStore.get("Cookies"),
    },
  });

  if (error) {
    return { success: false, error };
  }

  cookiesStore.set("sessionToken", data.token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    expires: new Date(data.expiresAt),
    path: "/",
  });
  return { success: true, error: undefined };
}

// Signup
type SignUpPayload =
  paths["/auth/signup"]["post"]["requestBody"]["content"]["application/json"];

async function signUp(payload: SignUpPayload) {
  const headersStore = await headers();
  const cookiesStore = await cookies();

  const api = apiClient();
  const { data, error } = await api.POST("/auth/signin", {
    body: payload,
    headers: {
      Cookies: headersStore.get("Cookies"),
    },
  });

  if (error) {
    return { success: false, error };
  }

  cookiesStore.set("sessionToken", data.token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    expires: new Date(data.expiresAt),
    path: "/",
  });
  return { success: true, error: undefined };
}

// Signout
async function signOut() {
  const headersStore = await headers();
  const cookiesStore = await cookies();

  const api = apiClient();
  const { error } = await api.GET("/auth/signout", {
    headers: {
      Cookies: headersStore.get("Cookies"),
    },
  });

  if (error) {
    return { success: false, error };
  }

  cookiesStore.set("sessionToken", "", {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: 0,
    path: "/",
  });
  return { success: true, error: undefined };
}
export { signIn };
