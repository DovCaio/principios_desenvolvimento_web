import { Request, Response } from "express";
import { SchedulingService } from "../service/scheduling.service";

export const SchedulingController = {
  async create(req: Request, res: Response) {
    try {
      const { leisureAreaId, startTime, endTime } = req.body;
      const userCpf = (req as any).user.cpf;

      const scheduling = await SchedulingService.create({
        userCpf,
        leisureAreaId,
        startTime,
        endTime,
      });

      return res.status(201).json(scheduling);
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  },

  async list(req: Request, res: Response) {
    try {
      const userCpf = (req as any).user.cpf;
      const schedulings = await SchedulingService.listByUser(userCpf);
      
      const formattedSchedulings = schedulings.map((s: any) => ({
        id: s.id,
        leisureAreaId: s.leisureAreaId,
        areaName: s.leisureArea?.name,
        startTime: s.startTime,
        endTime: s.endTime
      }));

      return res.status(200).json(formattedSchedulings);
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  }
};