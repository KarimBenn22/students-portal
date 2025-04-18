import { prisma } from "@/api/db";
import factories from "@/api/factories";

export default factories.teacher
  .createApp()
  .get("/", async (c) => {
    const { id } = c.var.session.user;

    const proposals = await prisma.proposal.findMany({
      where: {
        project: {
          authorId: id,
        },
      },
      include: {
        project: true,
        proposer: true,
      },
    });

    return c.json({ proposals });
  })
  .get("/recent", async (c) => {
    const session = c.var.session;

    const proposals = await prisma.proposal.findMany({
      where: {
        project: {
          authorId: session.user.id,
        },
      },
      include: {
        project: true,
        proposer: true,
      },
      orderBy: {
        createdAt: "desc",
      },
      take: 4,
    });

    return c.json({ proposals });
  })
  .get("/active", async (c) => {
    const session = c.var.session;

    const proposals = await prisma.proposal.findMany({
      where: {
        project: {
          authorId: session.user.id,
        },
        status: "ACCEPTED",
        lockedIn: false,
      },
      include: {
        project: true,
        proposer: true,
      },
      orderBy: {
        createdAt: "desc",
      },
      take: 4,
    });

    return c.json({
      proposals,
    });
  })
  .get("/accepted", async (c) => {
    const { user } = c.var.session;

    const proposals = await prisma.proposal.findMany({
      where: {
        project: {
          authorId: user.id,
        },
        status: "ACCEPTED",
        lockedIn: true,
      },
      include: {
        project: true,
        proposer: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return c.json({ proposals });
  })
  .get("/pending", async (c) => {
    const { user } = c.var.session;

    const proposals = await prisma.proposal.findMany({
      where: {
        project: {
          authorId: user.id,
        },
        status: "PENDING",
      },
      include: {
        project: true,
        proposer: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return c.json({ proposals });
  });
