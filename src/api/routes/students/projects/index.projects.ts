import { prisma } from "@/api/db";
import factories from "@/api/factories";
import { Specialty } from "@prisma/client";

export default factories.student
  .createApp()
  .get("/", async (c) => {
    const { user } = c.var.session;

    const projects = await prisma.project.findMany({
      where: {
        specialty: user.specialty as Specialty,
      },
      include: {
        author: true,
      },
    });

    const detailedProjects = projects.map((project) => ({
      ...project,
      authorId: undefined,
      author: project.author.name,
    }));

    return c.json({
      projects: detailedProjects,
    });
  })
  .get("/count", async (c) => {
    const { user } = c.var.session;

    const count = await prisma.project.count({
      where: {
        specialty: user.specialty as Specialty,
      },
    });

    return c.json({ count });
  })
  .get("/:id", async (c) => {
    const { id } = c.req.param();

    const project = await prisma.project.findUnique({
      where: {
        id,
      },
      include: {
        author: true,
      },
    });

    if (!project || project.specialty !== c.var.session.user.specialty) {
      return c.json(
        {
          code: "NOT_FOUND",
          message: "Project not found",
        },
        404
      );
    }

    return c.json({
      ...project,
      author: project.author.name,
    });
  });
