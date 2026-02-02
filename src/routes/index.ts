import { Router } from "express";
import employeeRoutes from "./employee.route";
import { leisureRoutes } from "./leisureArea.route";
import lotRoute from "./lot.route";
import residentRoutes from "./resident.route";
import { serviceRoutes } from "./serviceRequest.route";
import visitantRoutes from "./visitant.route";
import adminRoutes from "./admin.route";
import authRoutes from "./auth.route";

const routes = Router();

routes.use("/employee", employeeRoutes);
routes.use("/services", serviceRoutes);
routes.use("/lot", lotRoute);
routes.use("/visitor", visitantRoutes);
routes.use("/resident", residentRoutes);
routes.use("/leisure-areas", leisureRoutes);
routes.use("/admin", adminRoutes);
routes.use("/auth", authRoutes);
export default routes;
