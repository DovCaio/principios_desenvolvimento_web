import { NextFunction, Request, Response } from "express";
import { verifyToken } from "../utils/auth";

export const authenticate = (req: Request, res: Response, next: NextFunction) => {
    const token = req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
        return res.status(401).json({ message: "Acesso negado" });
    }

    try {
        const decoded = verifyToken(token);//Usar função auxiliar existente
        (req as any).user = decoded; 
        next();
    } catch (err) {
        res.status(401).json({ message: "Token inválido" });
    }
};