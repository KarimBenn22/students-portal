import { prisma } from "@/api/db";
import { zValidator } from "@hono/zod-validator";
import factories from "@/api/factories";
import {
  projectInsertSchema,
  projectUpdateSchema,
} from "@/lib/schemas/project.schema";

export default factories.teacher
  .createApp()
  .get("/", async (c) => {
    const { id } = c.var.session.user;
    const projects = await prisma.project.findMany({
      where: {
        authorId: id,
      },
    });

    return c.json(projects);
  })
  .post("/", zValidator("json", projectInsertSchema), async (c) => {
    const { id } = c.var.session.user;
    const data = c.req.valid("json");
    const project = await prisma.project.create({
      data: {
        ...data,
        author: {
          connect: {
            id,
          },
        },
      },
    });
    return c.json(project);
  })
  .patch("/:id", zValidator("json", projectUpdateSchema), async (c) => {
    const { id } = c.var.session.user;
    const { id: projectId } = c.req.param();
    const data = c.req.valid("json");
    const project = await prisma.project.update({
      where: {
        id: projectId,
        authorId: id,
      },
      data,
    });
    return c.json(project);
  })
  .delete("/:id", async (c) => {
    const { id } = c.var.session.user;
    const { id: projectId } = c.req.param();
    const project = await prisma.project.delete({
      where: {
        id: projectId,
        authorId: id,
      },
    });
    return c.json(project);
  });
