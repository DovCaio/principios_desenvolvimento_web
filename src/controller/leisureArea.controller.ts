import { Request, Response } from "express";
import { LeisureAreaService } from "../service/leisureArea.service";

export const LeisureAreaController = {

    async create(req: Request, res: Response) {
        try {
            const { name, capacity } = req.body;
            const result = await LeisureAreaService.create({ name, capacity });
            return res.status(201).json(result);
        } catch (error: any) {
            return res.status(400).json({ error: error.message });
        }
    },

    async list(req: Request, res: Response) {
        const result = await LeisureAreaService.listAll();
        return res.json(result);
    },

    async update(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const { name, capacity } = req.body;
            const result = await LeisureAreaService.update(Number(id), { name, capacity });
            return res.status(200).json(result);
        } catch (error: any) {
            return res.status(400).json({ error: error.message });
        }
    },

    async delete(req: Request, res: Response) {
        try {
            const { id } = req.params;
            await LeisureAreaService.delete(Number(id));
            return res.status(204).send();
        } catch (error: any) {
            return res.status(400).json({ error: error.message });
        }
    }
};