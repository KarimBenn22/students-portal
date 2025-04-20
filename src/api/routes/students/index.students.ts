import factories from "@/api/factories";
import roleMiddleware from "@/api/middleware/role.middleware";
import studentProjectsRoute from "./projects/index.projects";
import studentProposalsRoute from "./proposals/index.proposals";

export default factories.student
  .createApp()
  .use(roleMiddleware("student"))
  .get("/", (c) => c.text("واجهات برمجة الطلاب"))
  .route("/projects", studentProjectsRoute)
  .route("/proposals", studentProposalsRoute);
