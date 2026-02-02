import { Router } from "express";
import { AuthController } from "../controller/auth.controller";

const authRoutes = Router();

authRoutes.post("/resident_login", AuthController.residentLogin);

export default authRoutes;