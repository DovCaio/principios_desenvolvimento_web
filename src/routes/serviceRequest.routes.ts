import { Router } from "express";
import { ServiceRequestController } from "../controller/serviceRequest.controller";

const serviceRoutes = Router();

serviceRoutes.post("/", ServiceRequestController.create);
serviceRoutes.get("/", ServiceRequestController.list);

export { serviceRoutes };

