import { prisma } from "@/api/db";
import factories from "@/api/factories";
import { Specialty } from "@prisma/client";

export default factories.student
  .createApp()
  .get("/", async (c) => {
    const { id } = c.var.session.user;

    const proposals = await prisma.proposal.findMany({
      where: {
        proposerId: id,
      },
      include: {
        project: {
          include: {
            author: true,
          },
        },
      },
    });

    return c.json(proposals);
  })
  .post("/:projectId", async (c) => {
    const { id, specialty } = c.var.session.user;
    const { projectId } = c.req.param();

    // Check if the user already has a proposal for this project
    const existingProposal = await prisma.proposal.findFirst({
      where: {
        proposerId: id,
        projectId: projectId,
      },
    });

    if (existingProposal) {
      return c.json(
        {
          message: "You already have a proposal for this project",
        },
        400
      );
    }

    // Get project details to check specialty
    const project = await prisma.project.findUnique({
      where: {
        id: projectId,
      },
    });

    if (!project) {
      return c.json(
        {
          message: "Project not found",
        },
        404
      );
    }

    // Prevent creating proposal if project is in the outside specialty of the student
    if (project.specialty !== (specialty as Specialty)) {
      return c.json(
        {
          message:
            "You can't create proposals for projects outside your specialty",
        },
        400
      );
    }

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
      include: {
        project: {
          include: {
            author: true,
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

    const proposal = await prisma.proposal.delete({
      where: { id },
      include: {
        project: {
          include: {
            author: true,
          },
        },
      },
    });

    return c.json({
      message: "Proposal deleted successfully",
      proposal,
    });
  })
  .post("/:proposalId/lock-in", async (c) => {
    const { id } = c.var.session.user;
    const { proposalId } = c.req.param();

    if (!proposalId) {
      return c.json({ message: "Proposal ID is required" }, 400);
    }

    const proposal = await prisma.proposal.findFirst({
      where: {
        id: proposalId,
        proposerId: id,
        status: "ACCEPTED",
      },
    });

    if (!proposal) {
      return c.json(
        {
          message: "Proposal not found or not approved",
        },
        404
      );
    }

    const existingLockedProposal = await prisma.proposal.findFirst({
      where: {
        proposerId: id,
        lockedIn: true,
      },
    });

    if (existingLockedProposal) {
      return c.json(
        {
          message: "You already have a locked in project proposal",
        },
        400
      );
    }

    const updatedProposal = await prisma.proposal.update({
      where: { id: proposalId },
      data: { lockedIn: true },
      include: {
        project: {
          include: {
            author: true,
          },
        },
      },
    });

    return c.json({
      message: "Proposal locked in successfully",
      proposal: updatedProposal,
    });
  })
  .post("/:proposalId/unlock-in", async (c) => {
    const { id } = c.var.session.user;
    const { proposalId } = c.req.param();

    if (!proposalId) {
      return c.json(
        {
          message: "Proposal ID is required",
        },
        400
      );
    }

    const proposal = await prisma.proposal.findFirst({
      where: {
        id: proposalId,
        proposerId: id,
        lockedIn: true,
      },
    });

    if (!proposal) {
      return c.json(
        {
          message: "Locked-in proposal not found",
        },
        404
      );
    }

    const updatedProposal = await prisma.proposal.update({
      where: { id: proposalId },
      data: { lockedIn: false },
      include: {
        project: {
          include: {
            author: true,
          },
        },
      },
    });

    return c.json({
      message: "Proposal unlocked successfully",
      proposal: updatedProposal,
    });
  });
