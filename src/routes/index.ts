import { Router } from "express";
import { accessRoutes } from "./access.route";
import adminRoutes from "./admin.route";
import { authRoutes } from "./auth.route";
import employeeRoutes from "./employee.route";
import { leisureRoutes } from "./leisureArea.route";
import lotRoute from "./lot.route";
import residentRoutes from "./resident.route";
import { schedulingRoutes } from "./scheduling.route";
import { serviceRoutes } from "./serviceRequest.route";
import visitantRoutes from "./visitant.route";

const routes = Router();

routes.use("/employee", employeeRoutes);
routes.use("/services", serviceRoutes);
routes.use("/lot", lotRoute);
routes.use("/visitor", visitantRoutes);
routes.use("/resident", residentRoutes);
routes.use("/leisure-areas", leisureRoutes);
routes.use("/admin", adminRoutes);
routes.use("/auth", authRoutes);
routes.use("/scheduling", schedulingRoutes);
routes.use("/access", accessRoutes);

export default routes;