import { Request, Response } from "express";
import { UserService } from "./user.service";

export const UserController = {
  async index(req: Request, res: Response) {
    const users = await UserService.findAll();
    return res.json(users);
  },

  async show(req: Request, res: Response) {
    const user = await UserService.findById(Number(req.params.id));
    return res.json(user);
  },

  async create(req: Request, res: Response) {
    const user = await UserService.create(req.body);
    return res.status(201).json(user);
  },
};
