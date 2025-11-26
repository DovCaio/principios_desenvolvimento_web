import { Router } from "express";
import { EmployeeControler } from "./employee.controller";
import { asyncHandler } from "../../utils/asyncHandler";

const useRouter = Router();

useRouter.post("/", EmployeeControler.create);

export default useRouter;
