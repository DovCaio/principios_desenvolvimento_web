import { Request, Response } from "express";
import { EmployeeService } from "./employee.service";


export const EmployeeControler =  {
    async create(req: Request, res: Response) {
        const employee = await EmployeeService.create(req.body);
        return res.status(201).json(employee);
    },
    async update(req: Request, res: Response) {
        const employee = await EmployeeService.update(req.body);
        return res.status(200).json(employee);
    }
}