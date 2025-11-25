import { Router } from "express";
import userRoutes from "../module/user/user.route"

const routes = Router();

routes.use("/users", userRoutes);

export default routes;
