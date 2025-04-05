import factories from "../factories";

export default function teacherMiddleware() {
  return factories.base.createMiddleware(async (c, next) => {
    const { session } = c.var;
    
    // Log request details
    console.log("Request URL:", c.req.url);
    console.log("Request method:", c.req.method);
    
    // Log all headers for debugging
    const allHeaders: Record<string, string> = {};
    c.req.raw.headers.forEach((value, key) => {
      allHeaders[key] = value;
    });
    console.log("Request headers in middleware:", allHeaders);
    
    // Check for cookie header specifically
    const cookieHeader = c.req.raw.headers.get("cookie");
    console.log("Cookie header:", cookieHeader || "Not found");
    
    // Log session information
    console.log("Session in middleware:", session ? "Present" : "Missing");
    if (session) {
      console.log("User role:", (session.user as unknown as { role: string }).role);
    }
    
    if (!session) {
      return c.json({ 
        error: "Unauthorized", 
        message: "No session found",
        headers: allHeaders,
        cookie: cookieHeader || "No cookie header",
        requestUrl: c.req.url,
        requestMethod: c.req.method
      }, 401);
    }
    
    if ((session.user as unknown as { role: string }).role !== "teacher") {
      return c.json({ 
        error: "Unauthorized", 
        message: "User is not a teacher",
        userRole: (session.user as unknown as { role: string }).role
      }, 401);
    }
    
    return next();
  });
}
