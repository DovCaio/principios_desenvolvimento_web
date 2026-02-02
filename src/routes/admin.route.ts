import { Router } from "express";
import { AdminController } from "../controller/admin.controller";

const adminRoutes = Router();

adminRoutes.get("/", AdminController.getAdminInfos); 

export default adminRoutes;