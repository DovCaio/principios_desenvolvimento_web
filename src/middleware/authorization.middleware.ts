
import { NextFunction, Request, Response } from "express";
import { verifyToken } from "../utils/auth";
import prisma from "../prisma";
import { EmployeeType } from "@prisma/client";
import { NotAllowedException } from "../exceptions/NotAllowedException";

export const authorizationEmployeeManagment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    return res.status(401).json({ message: "Acesso negado" });
  }

  try {
    const decoded = verifyToken(token);

    if (decoded.userType !== "EMPLOYEE") {
      return res.status(403).json({ message: "Acesso não autorizado" });
    }

    const employee = await prisma.employee.findUnique({
      where: { userCpf: decoded.cpf },
    });

    if (!employee) {
      return res.status(404).json({ message: "Funcionário não encontrado" });
    }

    if (employee.employeeType !== EmployeeType.ManagementEmployee) {
      return res.status(403).json({ message: "Acesso não autorizado" });
    }

    (req as any).user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Token inválido" });
  }
};
