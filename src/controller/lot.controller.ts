import { Request, Response } from "express";
import { LotService } from "../service/lot.service";
export const LotController =  {
    async create(req: Request, res: Response) {
        const lot = await LotService.create(req.body);
        return res.status(201).json(lot);
    },
    async update(req: Request, res: Response) {
        const { id } = req.params;
        const lot = await LotService.update(Number(id), req.body);
        return res.status(200).json(lot);
    }
}