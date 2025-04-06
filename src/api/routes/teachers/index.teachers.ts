import factories from "@/api/factories";
import teacherMiddleware from "@/api/middleware/teacher.middleware";
import teacherProjectsApi from "./projects/index.projects";

export default factories.teacher
  .createApp()
  .use(teacherMiddleware())
  .get("/", (c) => c.text("Teachers APIs"))
  .route("/projects", teacherProjectsApi);
