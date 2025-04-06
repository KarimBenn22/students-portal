import factories from "../factories";

export default function teacherMiddleware() {
  return factories.base.createMiddleware(async (c, next) => {
    const { session } = c.var;

    if (!session) {
      return c.json(
        {
          error: "Unauthorized",
          message: "No session found",
        },
        401
      );
    }

    if ((session.user as unknown as { role: string }).role !== "teacher") {
      return c.json(
        {
          error: "Unauthorized",
          message: "User is not a teacher",
        },
        401
      );
    }

    return next();
  });
}
