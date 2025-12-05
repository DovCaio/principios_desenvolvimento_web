import { Router } from "express";
import { ServiceRequestController } from "../controller/serviceRequest.controller";

const serviceRoutes = Router();

serviceRoutes.post("/", ServiceRequestController.create);
serviceRoutes.get("/", ServiceRequestController.list);
serviceRoutes.put("/:id", ServiceRequestController.update);
serviceRoutes.delete("/:id", ServiceRequestController.delete);


export { serviceRoutes };

