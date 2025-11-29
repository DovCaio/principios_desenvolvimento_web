import { Router } from "express";
import employeeRoutes from "./employee.route"
import lotRoute from "./lot.route"
const routes = Router();

routes.use("/employee", employeeRoutes);
routes.use("/lot", lotRoute);

export default routes;
