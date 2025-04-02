import { NextRequest, NextResponse } from "next/server";
import { getCurrentSession } from "@/actions/actions";

function createRouteMatcher(paths: string[]) {
    return (request: NextRequest): boolean => {
        for (const path of paths) {
            const regex = new RegExp(`^${path}$`);
            if (regex.test(request.nextUrl.pathname)) {
                return true;
            }
        }
        return false;
    };
}

const isGuestRoute = createRouteMatcher(["/signin", "/signup", "/"]);
const isTeacherRoute = createRouteMatcher([]);
const isStudentRoute = createRouteMatcher([]);

export default async function middleware(request: NextRequest) {
    const session = await getCurrentSession();
    console.log(session);

    // Handle authenticated users
    if (session) {
        const { role } = session.user;

        // Redirect authenticated users from guest routes
        if (isGuestRoute(request)) {
            if (role === "teacher") {
                return NextResponse.json({ error: "not implemented" }, { status: 500 });
            } else if (role === "student") {
                return NextResponse.json({ error: "not implemented" }, { status: 500 });
            }
        }

        // Protect teacher routes
        if (isTeacherRoute(request) && role !== "teacher") {
            return NextResponse.json({ error: "not implemented" }, { status: 500 });
        }

        // Protect student routes
        if (isStudentRoute(request) && role !== "student") {
            return NextResponse.json({ error: "not implemented" }, { status: 500 });
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
        "/((?!api|_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)"
    ]
};