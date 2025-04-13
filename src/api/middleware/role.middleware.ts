import factories from "../factories";

export default function roleMiddleware(role: "student" | "teacher") {
  return factories.base.createMiddleware(async (c, next) => {
    const { session } = c.var;

    if (!session) {
      return c.json(
        {
          error: "Unauthorized",
          message: "Not authenticated",
        },
        401
      );
    }

    if ((session.user as unknown as { role: string }).role !== role) {
      return c.json(
        {
          error: "Unauthorized",
          message: `User is not a ${role}`,
        },
        401
      );
    }

    return next();
  });
}
