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

    if (start < new Date()) {
      throw new Error("A data não pode ser no passado");
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
      const startHour = start.getHours();
      const endHour = end.getHours();

      const openRule = parseInt(area.openHour.split(":")[0]);
      const closeRule = parseInt(area.closeHour.split(":")[0]);

      if (startHour < openRule || endHour > closeRule) {
        throw new Error("O agendamento está fora do horário de funcionamento");
      }
    }

    const conflict = await prisma.scheduling.findFirst({
      where: {
        leisureAreaId: leisureAreaId,
        AND: [
          { startTime: { lt: end } },
          { endTime: { gt: start } },
        ],
      },
    });

    if (conflict) {
      throw new Error("Horário indisponível");
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
};