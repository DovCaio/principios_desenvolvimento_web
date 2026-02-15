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
};