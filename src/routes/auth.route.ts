import { Router } from "express";
import { AuthController } from "../controller/auth.controller";
import { authLimiter } from "../middleware/rateLimit.middleware";

const authRoutes = Router();

authRoutes.post("/login", authLimiter, AuthController.login);

export { authRoutes };

