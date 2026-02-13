import { Request, Response } from "express";
import { ServiceRequestService } from "../service/serviceRequest.service";

export const ServiceRequestController = {

    async create(req: Request, res: Response) {
        try {
            const { description, type, targetLotId } = req.body;
            
            const requesterCpf = req.headers['x-user-cpf'] as string;

            if (!requesterCpf) {
                return res.status(400).json({ error: "CPF obrigatório no header x-user-cpf" });
            }

            const result = await ServiceRequestService.create({
                description,
                type,
                requesterCpf,
                targetLotId
            });

            return res.status(201).json(result);
        } catch (error: any) {
            return res.status(400).json({ error: error.message });
        }
    },

    async list(req: Request, res: Response) {
        try {
            const result = await ServiceRequestService.listAll();
            return res.status(200).json(result);
        } catch (error: any) {
            return res.status(400).json({ error: error.message });
        }
    },

    async update(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const { description, type, status, targetLotId } = req.body;
            
            const updaterCpf = req.headers['x-user-cpf'] as string;

            if (!updaterCpf) {
                return res.status(400).json({ error: "CPF obrigatório no header x-user-cpf" });
            }

            const result = await ServiceRequestService.update(Number(id), updaterCpf, {
                description,
                type,
                status,
                targetLotId
            });

            return res.status(200).json(result);
        } catch (error: any) {
            return res.status(400).json({ error: error.message });
        }
    },

    async delete(req: Request, res: Response) {
        try {
            const { id } = req.params;
            await ServiceRequestService.delete(Number(id));
            return res.status(204).send();
        } catch (error: any) {
            return res.status(400).json({ error: error.message });
        }
    }
};