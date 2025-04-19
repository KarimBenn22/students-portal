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
  })
  .post("/:proposalId/accept", async (c) => {
    const { proposalId } = c.req.param();
    const { user } = c.var.session;
    
    // Find the proposal and ensure it belongs to a project owned by this teacher
    const proposal = await prisma.proposal.findFirst({
      where: {
        id: proposalId,
        project: {
          authorId: user.id,
        },
        status: "PENDING",
      },
      include: {
        project: true,
      },
    });

    if (!proposal) {
      return c.json(
        {
          message: "Proposal not found or already processed",
        },
        404
      );
    }

    // Update the proposal status to ACCEPTED
    const updatedProposal = await prisma.proposal.update({
      where: { id: proposalId },
      data: { status: "ACCEPTED" },
      include: {
        project: true,
        proposer: true,
      },
    });

    return c.json({
      message: "Proposal accepted successfully",
      proposal: updatedProposal,
    });
  })
  .post('/:proposalId/reject', async (c) => {
    const { proposalId } = c.req.param();
    const { user } = c.var.session;
    
    // Find the proposal and ensure it belongs to a project owned by this teacher
    const proposal = await prisma.proposal.findFirst({
      where: {
        id: proposalId,
        project: {
          authorId: user.id,
        },
        status: "PENDING",
      },
      include: {
        project: true,
      },
    });

    if (!proposal) {
      return c.json(
        {
          message: "Proposal not found or already processed",
        },
        404
      );
    }

    // Update the proposal status to REJECTED
    const updatedProposal = await prisma.proposal.update({
      where: { id: proposalId },
      data: { status: "REJECTED" },
      include: {
        project: true,
        proposer: true,
      },
    });

    return c.json({
      message: "Proposal rejected successfully",
      proposal: updatedProposal,
    });
  })
