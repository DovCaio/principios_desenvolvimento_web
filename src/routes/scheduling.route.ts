import { Router } from "express";
import { SchedulingController } from "../controller/scheduling.controller";
import { authenticate } from "../middleware/auth.middleware";

const schedulingRoutes = Router();

schedulingRoutes.post("/", authenticate, SchedulingController.create);

export { schedulingRoutes };

