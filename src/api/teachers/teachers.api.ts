import factories from "../factories";
import teacherMiddleware from "../middleware/teacher.middleware";
import teacherProjectsApi from "./projects/projects.api";

export default factories.teacher
  .createApp()
  .use(teacherMiddleware())
  .get("/", (c) => c.text("Teachers APIs"))
  .route("/projects", teacherProjectsApi);
