import { Router } from "express";
import { LeisureAreaController } from "../controller/leisureArea.controller";

const leisureRoutes = Router();

leisureRoutes.post("/", LeisureAreaController.create);
leisureRoutes.get("/", LeisureAreaController.list);
leisureRoutes.put("/:id", LeisureAreaController.update);
leisureRoutes.delete("/:id", LeisureAreaController.delete);

export { leisureRoutes };

