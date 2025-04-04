import { auth } from "./auth/index.auth";
import factories from "./factories";
import authMiddleware from "./middleware/auth.middleware";
import teacherApi from "./teacher/teacher.api";

export const api = factories.base
  .createApp()
  .basePath("/api")
  .on(["POST", "GET"], "/auth/*", (c) => {
    return auth.handler(c.req.raw);
  })
  .use(authMiddleware())
  .get("/", (c) => c.text("Finals Portal APIs"))
  .route("/teacher", teacherApi);

export type ApiType = typeof api;
export default api;
