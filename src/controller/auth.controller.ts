import { Request, Response } from "express";
import { AuthService } from "../service/auth.service";

export const AuthController = {
  async login(req: Request, res: Response) {
    const { cpf, password } = req.body;
    const result = await AuthService.login(cpf, password);
    return res.status(200).json(result);
  },
};
