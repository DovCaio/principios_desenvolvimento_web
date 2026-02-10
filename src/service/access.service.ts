import { AccessStatus, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const AccessService = {
  async registerEntry(visitorId: number) {
    const visitor = await prisma.visitor.findUnique({
      where: { id: visitorId },
    });

    if (!visitor) {
      throw new Error("Visitante não encontrado");
    }

    const activeLog = await prisma.accessLog.findFirst({
      where: {
        visitorId,
        status: AccessStatus.OPEN,
      },
    });

    if (activeLog) {
      throw new Error("Visitante já está dentro do condomínio");
    }

    return await prisma.accessLog.create({
      data: {
        visitorId,
        status: AccessStatus.OPEN,
      },
    });
  },

  async registerExit(visitorId: number) {
    const activeLog = await prisma.accessLog.findFirst({
      where: {
        visitorId,
        status: AccessStatus.OPEN,
      },
    });

    if (!activeLog) {
      throw new Error("Visitante não registrou entrada ou já saiu");
    }

    return await prisma.accessLog.update({
      where: { id: activeLog.id },
      data: {
        exitTime: new Date(),
        status: AccessStatus.CLOSED,
      },
    });
  },

  async listActiveVisitors() {
    return await prisma.accessLog.findMany({
      where: { status: AccessStatus.OPEN },
      include: {
        visitor: {
          include: {
            user: true,
            lot: true,
          },
        },
      },
    });
  },
};