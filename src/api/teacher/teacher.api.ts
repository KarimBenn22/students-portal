import { auth } from "../auth/teacher.auth";
import factories from "../factories";

export default factories.teacher
  .createApp()
  .get("/", (c) => c.text("Teacher APIs"))
  .on(["POST", "GET"], "/auth/*", (c) => {
    return auth.handler(c.req.raw);
  });
