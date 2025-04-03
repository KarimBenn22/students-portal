import factories from "./factories";
import teacherApi from "./teacher/teacher.api";

export const api = factories.base
  .createApp()
  .basePath("/api")
  .get("/", (c) => c.text("Finals Portal APIs"))
  .route("/teacher", teacherApi);

export type ApiType = typeof api;
export default api;
