import { Router } from "express";
import { EmployeeControler } from "./employee.controller";
import { asyncHandler } from "../../utils/asyncHandler";

const useRouter = Router();

useRouter.post("/", EmployeeControler.create);
useRouter.put("/", EmployeeControler.update);

export default useRouter;
