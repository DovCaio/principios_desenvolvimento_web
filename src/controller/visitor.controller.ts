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
    }
}
