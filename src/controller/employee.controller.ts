import { Request, Response } from "express";
import { EmployeeService } from "../service/employee.service";


export const EmployeeController = {
  async create(req: Request, res: Response) {
    const employee = await EmployeeService.create(req.body);
    return res.status(201).json(employee);
  },
  async update(req: Request, res: Response) {
    const { cpf } = req.params;
    const employee = await EmployeeService.update(cpf, req.body);
    return res.status(200).json(employee);
  },
  async get(req: Request, res: Response) {
    const { cpf } = req.params;
    const employee = await EmployeeService.get(cpf);
    return res.status(200).json(employee);
  },
  async delete(req: Request, res: Response) {
    const { cpf } = req.params;
    await EmployeeService.delete(cpf);
    return res.status(204).send();
  },
  async associateResidentLot(req: Request, res: Response) {
    const { cpf, lotId } = req.params;
    const resident = await EmployeeService.associateResidentLot(cpf, parseInt(lotId));
    return res.status(200).json(resident);
  },
  async dessociateResidentLot(req: Request, res: Response) {
    const { cpf, lotId } = req.params;
    await EmployeeService.dessociateResidentLot(cpf, parseInt(lotId));
    return res.status(204).send();
  },
  async associateResidentLotResponsible(req: Request, res: Response) {
    const { cpf, lotId } = req.params;
    const responsible = await EmployeeService.associateResidentLotResponsible(cpf, parseInt(lotId));
    return res.status(200).json(responsible);
  }
};
