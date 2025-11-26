import { Router } from "express";
import employeeRoutes from "../module/employee/employee.route"

const routes = Router();

routes.use("/employee", employeeRoutes);

export default routes;
