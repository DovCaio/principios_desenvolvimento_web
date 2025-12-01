import { Router } from "express";
import residentRoutes from "./resident.route"
import employeeRoutes from "./employee.route";
import { serviceRoutes } from "./serviceRequest.routes";
import lotRoute from "./lot.route";

const routes = Router();

routes.use("/employee", employeeRoutes);
routes.use("/services", serviceRoutes);
routes.use("/lot", lotRoute);
routes.use("/resident", residentRoutes);

export default routes;