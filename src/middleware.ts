import { NextRequest, NextResponse } from "next/server";
import { teacherAuthClient } from "./client/teacher-auth.client";

function createRouteMatcher(paths: string[]) {
  return (request: NextRequest): boolean => {
    for (const path of paths) {
      const escapedPath = path.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      const regex = new RegExp(`^${escapedPath}$`);
      if (regex.test(request.nextUrl.pathname)) {
        return true;
      }
    }
    return false;
  };
}

const isGuestRoute = createRouteMatcher(["/signin", "/signup"]);
const isTeacherRoute = createRouteMatcher(["/"]);

export default async function middleware(request: NextRequest) {
  const { data: teacherSession } = await teacherAuthClient.getSession({
    fetchOptions: {
      headers: {
        cookie: request.headers.get("cookie") ?? "",
      },
    },
  });

  // Handle authenticated Teachers
  if (teacherSession) {
    // Redirect authenticated teachers from guest routes
    if (isGuestRoute(request)) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  } else {
    if (isTeacherRoute(request)) {
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
