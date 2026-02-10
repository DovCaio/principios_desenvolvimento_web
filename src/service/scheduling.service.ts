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
      throw new Error("Date cannot be in the past");
    }

    if (end <= start) {
      throw new Error("End time must be after start time");
    }

    const area = await prisma.leisureArea.findUnique({
      where: { id: leisureAreaId },
    });

    if (!area) {
      throw new Error("Leisure area not found");
    }

    if (area.openHour && area.closeHour) {
      const startHour = start.getHours();
      const endHour = end.getHours();

      const openRule = parseInt(area.openHour.split(":")[0]);
      const closeRule = parseInt(area.closeHour.split(":")[0]);

      if (startHour < openRule || endHour > closeRule) {
        throw new Error("Scheduling is outside of operating hours");
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
      throw new Error("Time slot unavailable");
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