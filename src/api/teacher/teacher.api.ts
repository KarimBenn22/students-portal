
import factories from "../factories";

export default factories.teacher
  .createApp()
  .get("/", (c) => c.text("Teacher APIs"))
