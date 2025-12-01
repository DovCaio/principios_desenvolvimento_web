import { Request, Response } from "express";
import { ResidentService } from "../service/resident.service";

export const ResidentController =  {
    async create(req: Request, res: Response) {
        const resident = await ResidentService.create(req.body);
        return res.status(201).json(resident);
    },
    async update(req: Request, res: Response) {
        const { cpf } = req.params;
        const resident = await ResidentService.update(cpf, req.body);
        return res.status(200).json(resident);
    },
    async getOne(req: Request, res: Response) {
        const { cpf } = req.params;
        const resident = await ResidentService.getOne(cpf);
        return res.status(200).json(resident);
    }
}