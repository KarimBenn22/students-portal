"use server";
import { apiClient } from "@/api/api-client";
import { paths } from "@/api/schema";
import { cache } from "react";
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
      cookie: headersStore.get("cookie"),
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
  const { data, error } = await api.POST("/auth/signup", {
    body: payload,
    headers: {
      cookie: headersStore.get("cookie"),
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
      cookie: headersStore.get("cookie"),
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

const me = async () => {
  const headersStore = await headers();
  console.log("headers", headersStore.get("cookie"));
  const api = apiClient();
  return await api.GET("/auth/me", {
    headers: {
      cookie: headersStore.get("cookie"),
    }
  })
};

const getCurrentSession = async () => {
  return await cache(async () => {
    const cookieStore = await cookies();
    const token = cookieStore.get("sessionToken")?.value ?? null;
    if (token === null) {
      return null;
    }

    const { data, error } = await me()
    console.log(data, error);
    if (error) {
      return null;
    }

    if (data.token !== token) {
      return null;
    }

    return data;
  })();
}

export { signIn, signUp, signOut, me, getCurrentSession };
