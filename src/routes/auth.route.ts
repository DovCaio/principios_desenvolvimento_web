import { Router } from "express";
import { AuthController } from "../controller/auth.controller";

const authRoutes = Router();

authRoutes.post("/login", AuthController.login);

export { authRoutes };

