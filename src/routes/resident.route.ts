import { Router } from "express";
import { ResidentController } from "../controller/resident.controller";

const useRouter = Router();

useRouter.post("/", ResidentController.create);
useRouter.put("/:cpf", ResidentController.update);
useRouter.get("/:cpf", ResidentController.getOne);


export default useRouter;
