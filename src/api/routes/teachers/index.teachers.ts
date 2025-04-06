import factories from "@/api/factories";
import roleMiddleware from "@/api/middleware/role.middleware";
import teacherProjectsRoute from "./projects/index.projects";

export default factories.teacher
  .createApp()
  .use(roleMiddleware("teacher"))
  .get("/", (c) => c.text("Teachers APIs"))
  .route("/projects", teacherProjectsRoute);
