import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export const authenticate = (req: Request, res: Response, next: NextFunction) => {
    const token = req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
        return res.status(401).json({ message: "Acesso negado" });
    }

    try {
        const secret = process.env.JWT_SECRET || "segredo_padrao_dev";
        const decoded = jwt.verify(token, secret);
        (req as any).user = decoded;
        next();
    } catch (err) {
        res.status(401).json({ message: "Token inválido" });
    }
};