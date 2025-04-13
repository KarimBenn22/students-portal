import { prisma } from "@/api/db";
import factories from "@/api/factories";

export default factories.student
  .createApp()
  .get("/", async (c) => {
    const { id } = c.var.session.user;

    const proposals = await prisma.proposal.findMany({
      where: {
        proposerId: id,
      },
    });

    return c.json(proposals);
  })
  .post("/:projectId", async (c) => {
    const { id } = c.var.session.user;
    const { projectId } = c.req.param();

    const proposal = await prisma.proposal.create({
      data: {
        proposer: {
          connect: {
            id,
          },
        },
        project: {
          connect: {
            id: projectId,
          },
        },
      },
    });

    return c.json({
      message: "Proposal created successfully",
      proposal,
    });
  })
  .delete("/:id", async (c) => {
    const { id } = c.req.param();

    const proposal = await prisma.proposal.delete({ where: { id } });

    return c.json({
      message: "Proposal deleted successfully",
      proposal,
    });
  });
