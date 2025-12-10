import { Router } from "express";
import employeeRoutes from "./employee.route";
import { leisureRoutes } from "./leisureArea.routes";
import lotRoute from "./lot.route";
import residentRoutes from "./resident.route";
import { serviceRoutes } from "./serviceRequest.routes";
import visitantRoutes from "./visitant.route";

const routes = Router();

routes.use("/employee", employeeRoutes);
routes.use("/services", serviceRoutes);
routes.use("/lot", lotRoute);
routes.use("/visitor", visitantRoutes);
routes.use("/resident", residentRoutes);
routes.use("/leisure-areas", leisureRoutes);
export default routes;