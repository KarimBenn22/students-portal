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
          message: "لديك بالفعل اقتراح لهذا المشروع",
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
          message: "المشروع غير موجود",
        },
        404
      );
    }

    // Prevent creating proposal if project is in the outside specialty of the student
    if (project.specialty !== (specialty as Specialty)) {
      return c.json(
        {
          message:
            "لا يمكنك إنشاء اقتراحات لمشاريع خارج تخصصك",
        },
        400
      );
    }

    // Check if user already has 3 proposals
    const userProposalsCount = await prisma.proposal.count({
      where: {
        proposerId: id
      }
    });

    if (userProposalsCount >= 3) {
      return c.json(
        {
          message: "لا يمكنك إنشاء أكثر من 3 اقتراحات",
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
      message: "تم إنشاء الاقتراح بنجاح",
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
      message: "تم حذف الاقتراح بنجاح",
      proposal,
    });
  })
  .post("/:proposalId/lock-in", async (c) => {
    const { id } = c.var.session.user;
    const { proposalId } = c.req.param();

    if (!proposalId) {
      return c.json({ message: "معرّف الاقتراح مطلوب" }, 400);
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
          message: "الاقتراح غير موجود أو لم تتم الموافقة عليه",
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
          message: "لديك بالفعل اقتراح مشروع مقفل",
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
      message: "تم قفل الاقتراح بنجاح",
      proposal: updatedProposal,
    });
  })
  .post("/:proposalId/unlock-in", async (c) => {
    const { id } = c.var.session.user;
    const { proposalId } = c.req.param();

    if (!proposalId) {
      return c.json(
        {
          message: "معرّف الاقتراح مطلوب",
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
          message: "لم يتم العثور على الاقتراح المقفل",
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
      message: "تم فتح قفل الاقتراح بنجاح",
      proposal: updatedProposal,
    });
  });
