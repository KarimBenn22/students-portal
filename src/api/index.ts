import { auth } from "./auth/index.auth";
import factories from "./factories";
import authMiddleware from "./middleware/auth.middleware";
import teachersApi from "./teachers/teachers.api";

export const api = factories.base
  .createApp()
  .basePath("/api")
  .on(["POST", "GET"], "/auth/*", (c) => {
    return auth.handler(c.req.raw);
  })
  .use(authMiddleware())
  .get("/", (c) => c.text("Finals Portal APIs"))
  .route("/teachers", teachersApi);

export type ApiType = typeof api;
export default api;
