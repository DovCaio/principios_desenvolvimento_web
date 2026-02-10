import { Router } from "express";
import { AccessController } from "../controller/access.controller";
import { authenticate } from "../middleware/auth.middleware";

const accessRoutes = Router();

accessRoutes.post("/entry", authenticate, AccessController.entry);
accessRoutes.post("/exit", authenticate, AccessController.exit);
accessRoutes.get("/active", authenticate, AccessController.listActive);

export { accessRoutes };

