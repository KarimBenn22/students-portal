import { NextRequest, NextResponse } from "next/server";
import { authClient } from "./client/auth.client";

function createRouteMatcher(paths: string[]) {
  return (request: NextRequest): boolean => {
    for (const path of paths) {
      const escapedPath = path
        .replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
        .replace("\\*", ".*");
      const regex = new RegExp(`^${escapedPath}`);
      if (regex.test(request.nextUrl.pathname)) {
        return true;
      }
    }
    return false;
  };
}

const isGuestRoute = createRouteMatcher(["/signin", "/signup"]);
const isTeacherRoute = createRouteMatcher(["/teacher", "/teacher/*"]);
const isStudentRoute = createRouteMatcher(["/student", "/student/*"]);

export default async function middleware(request: NextRequest) {
  const { data: session } = await authClient.getSession({
    fetchOptions: {
      headers: {
        cookie: request.headers.get("cookie") ?? "",
      },
    },
  });

  if (request.nextUrl.pathname === "/") {
    return NextResponse.redirect(new URL("/signin", request.url));
  }

  // Handle authenticated users
  if (session) {
    const { role } = session.user as unknown as { role: string };

    // Redirect authenticated users from guest routes
    if (isGuestRoute(request)) {
      if (role === "teacher") {
        return NextResponse.redirect(new URL("/teacher", request.url));
      } else if (role === "student") {
        return NextResponse.redirect(new URL("/student", request.url));
      }
    }

    // Protect teacher routes
    if (isTeacherRoute(request) && role !== "teacher") {
      return NextResponse.redirect(new URL("/student", request.url));
    }

    // Protect student routes
    if (isStudentRoute(request) && role !== "student") {
      return NextResponse.redirect(new URL("/teacher", request.url));
    }
  } else {
    if (isTeacherRoute(request) || isStudentRoute(request)) {
      return NextResponse.redirect(new URL("/signin", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
  ],
};
