import { Request, Response } from "express";
import { LotService } from "../service/lot.service";
export const LotController =  {
    async create(req: Request, res: Response) {
        const lot = await LotService.create(req.body);
        return res.status(201).json(lot);
    }
}