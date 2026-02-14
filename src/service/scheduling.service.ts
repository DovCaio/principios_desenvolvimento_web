import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

interface CreateSchedulingDto {
  userCpf: string;
  leisureAreaId: number;
  startTime: string;
  endTime: string;
}

export const SchedulingService = {
  async create({ userCpf, leisureAreaId, startTime, endTime }: CreateSchedulingDto) {
    const start = new Date(startTime);
    const end = new Date(endTime);

    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
       throw new Error("Data inválida");
    }

    if (end <= start) {
      throw new Error("O horário de fim deve ser depois do horário de início");
    }

    const area = await prisma.leisureArea.findUnique({
      where: { id: leisureAreaId },
    });

    if (!area) {
      throw new Error("Área de lazer não encontrada");
    }

    if (area.openHour && area.closeHour) {
      const startHour = start.getUTCHours(); 
      const endHour = end.getUTCHours();
      
      const openRule = parseInt(area.openHour.split(":")[0]);
      const closeRule = parseInt(area.closeHour.split(":")[0]);
      
    }

    const currentBookingsCount = await prisma.scheduling.count({
      where: {
        leisureAreaId: leisureAreaId,
        AND: [
          { startTime: { lt: end } },
          { endTime: { gt: start } }
        ]
      }
    });

    if (currentBookingsCount >= area.capacity) {
      throw new Error("Capacidade máxima da área atingida para este horário");
    }

    const userConflict = await prisma.scheduling.findFirst({
      where: {
        userCpf: userCpf,
        AND: [
          { startTime: { lt: end } },
          { endTime: { gt: start } }
        ]
      }
    });

    if (userConflict) {
      throw new Error("Você já possui um agendamento neste horário");
    }

    return await prisma.scheduling.create({
      data: {
        userCpf,
        leisureAreaId,
        startTime: start,
        endTime: end,
      },
    });
  },

  async listAll() {
      return await prisma.scheduling.findMany();
  },

  async delete(id: number) {
      return await prisma.scheduling.delete({ where: { id } });
  }
};