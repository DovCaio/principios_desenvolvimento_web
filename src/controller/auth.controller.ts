import { Request, Response } from "express";
import { comparePassword, generateToken } from '../utils/auth';


export const AuthController = {
    async residentLogin(req: Request, res: Response) {
        res.status(200).json({ message: "resident loged successfully" });
    }
};