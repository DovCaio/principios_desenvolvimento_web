import { Router } from "express";
import { ServiceRequestController } from "../controller/serviceRequest.controller";
import { authenticate } from "../middleware/auth.middleware";

const serviceRoutes = Router();

serviceRoutes.post("/", ServiceRequestController.create);

serviceRoutes.get("/", ServiceRequestController.list);

serviceRoutes.put("/:id", ServiceRequestController.update);

serviceRoutes.delete("/:id", ServiceRequestController.delete);

serviceRoutes.get("/me", authenticate, ServiceRequestController.listByUser);

export { serviceRoutes };
