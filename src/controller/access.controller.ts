import { Request, Response } from "express";
import { AccessService } from "../service/access.service";

export const AccessController = {
  async entry(req: Request, res: Response) {
    try {
      const { visitorId } = req.body;
      const result = await AccessService.registerEntry(Number(visitorId));
      return res.status(201).json(result);
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  },

  async exit(req: Request, res: Response) {
    try {
      const { visitorId } = req.body;
      const result = await AccessService.registerExit(Number(visitorId));
      return res.status(200).json(result);
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  },

  async listActive(req: Request, res: Response) {
    try {
      const result = await AccessService.listActiveVisitors();
      return res.status(200).json(result);
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  },
};