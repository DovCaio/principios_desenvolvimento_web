import { Router } from "express";
import { UserController } from "./user.controller";

const useRouter = Router();

useRouter.get("/", UserController.index);
useRouter.get("/:id", UserController.show);
useRouter.post("/", UserController.create);

export default useRouter;
