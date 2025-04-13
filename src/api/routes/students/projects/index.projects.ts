import { prisma } from "@/api/db";
import factories from "@/api/factories";
import { projectsSearchSchema } from "@/lib/schemas/search.schema";
import { zValidator } from "@hono/zod-validator";

export default factories.student
  .createApp()
  .get("/", zValidator("query", projectsSearchSchema), async (c) => {
    const { q, page, limit, category, specialty } = c.req.valid("query");

    const filter = {
      AND: [
        q
          ? {
              OR: [
                { title: { contains: q, mode: "insensitive" as const } },
                { description: { contains: q, mode: "insensitive" as const } },
              ],
            }
          : {},
        category ? { category } : {},
        specialty ? { specialty } : {},
      ],
    };

    const projects = await prisma.project.findMany({
      where: filter,
      include: {
        author: true,
      },
      skip: (page - 1) * limit,
      take: limit,
    });

    const detailedProjects = projects.map((project) => ({
      ...project,
      authorId: undefined,
      author: project.author.name,
    }));

    const totalProjects = await prisma.project.count({
      where: filter,
    });

    return c.json({
      projects: detailedProjects,
      pagenation: {
        currentPage: page,
        totalPages: Math.ceil(totalProjects / limit),
        totalItems: totalProjects,
        limit,
        hasMore: page < Math.ceil(totalProjects / limit),
        prevPage: page > 1 ? page - 1 : null,
        naxtPage: page < Math.ceil(totalProjects / limit) ? page + 1 : null,
      },
      filters: {
        query: q,
        category,
        specialty,
      },
    });
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

    if (!project) {
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
      authorId: undefined,
      author: project.author.name,
    });
  });
