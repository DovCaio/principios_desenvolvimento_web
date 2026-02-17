import { Request, Response } from "express";
import { EmployeeService } from "../service/employee.service";
import { getCpfFromToken } from "../utils/auth";


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
    const employeeCpf = getCpfFromToken(req.header("Authorization")?.replace("Bearer ", "") || ""); 
    const resident = await EmployeeService.associateResidentLot(cpf, employeeCpf, parseInt(lotId));
    return res.status(200).json(resident);
  },
  async dessociateResidentLot(req: Request, res: Response) {
    const { cpf, lotId } = req.params;
    const employeeCpf = getCpfFromToken(req.header("Authorization")?.replace("Bearer ", "") || ""); 
    await EmployeeService.dessociateResidentLot(cpf, employeeCpf, parseInt(lotId));
    return res.status(204).send();
  },
  async associateResidentLotResponsible(req: Request, res: Response) {
    const { cpf, lotId } = req.params;
    const employeeCpf = getCpfFromToken(req.header("Authorization")?.replace("Bearer ", "") || ""); 
    const responsible = await EmployeeService.associateResidentLotResponsible(cpf, employeeCpf, parseInt(lotId));
    return res.status(200).json(responsible);
  },
  async unmakeResponsibleResidentLot(req: Request, res: Response) {
    const { cpf, lotId } = req.params;
    const employeeCpf = getCpfFromToken(req.header("Authorization")?.replace("Bearer ", "") || ""); 
    await EmployeeService.unmakeResponsibleResidentLot(cpf, employeeCpf, parseInt(lotId));
    return res.status(204).send();
  },
  async getLotHistoric(req: Request, res: Response) {
    const { lotId } = req.params;
    const historic = await EmployeeService.getLotHistoric(parseInt(lotId));
    return res.status(200).json(historic);
  }
};
