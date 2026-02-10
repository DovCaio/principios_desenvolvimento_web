import { Request, Response } from "express";
import { VisitorService } from "../service/visitor.service";

export const VisitorController =  {
    async create(req: Request, res: Response) {
        const visitor = await VisitorService.create(req.body);
        return res.status(201).json(visitor);
    },
    async update(req: Request, res: Response) {
        const { cpf } = req.params;
        const data = req.body;
        
        const visitor = await VisitorService.update(cpf, data);
        return res.status(200).json(visitor);
    },
    async getOne(req: Request, res: Response) {
        const { cpf } = req.params;
        
        const visitor = await VisitorService.getOne(cpf);
        return res.status(200).json(visitor);
    },
    async getAll(req: Request, res: Response) {
        const visitors = await VisitorService.getAll();
        return res.status(200).json(visitors);
    },
    async delete(req: Request, res: Response) {
        const { cpf } = req.params;
        await VisitorService.delete(cpf);
        
        return res.status(204).send();
    },
    async entryRecord(req: Request, res: Response) {
        const { visitantId, type } = req.body
        await VisitorService.entryRecord(visitantId, type);
        
        return res.status(200).send();
    }
}
