import { auth } from "../auth/index.auth";
import factories from "../factories";

export default function authMiddleware() {
  return factories.base.createMiddleware(async (c, next) => {
    const session = await auth.api.getSession(c.req.raw);
    c.set("session", session);
    return next();
  });
}
