import { Router } from "express";
import { LotController } from "../controller/lot.controller";


const useRouter = Router();

useRouter.post("/", LotController.create);

export default useRouter;
