import { NextFunction, Request, Response } from "express";
import { verifyToken } from "../utils/auth";
import { saveAudit } from "../prisma";

export const auditMiddleware = () => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const start = Date.now();
    const token = req.header("Authorization")?.replace("Bearer ", "");

    let cpf = null;

    try {
      if (token) {
        const decoded = verifyToken(token);
        (req as any).user = decoded;
        cpf = decoded.cpf;
      }
    } catch {
      return res.status(401).json({ message: "Token inválido" });
    }

    res.on("finish", async () => {

      try {
        await saveAudit({
          userCpf: cpf,
          method: req.method,
          path: req.originalUrl,
          status: res.statusCode,
          ip: req.ip,
          body: req.method !== "GET" ? JSON.stringify(req.body) : null,
          timestamp: new Date(),
          duration: Date.now() - start,
        });
      } catch (e) {
        console.error("AUDIT ERROR:", e);
      }
    });

    next();
  };
};
