import { EmployeeType } from "@prisma/client";
import { IsEnum } from "class-validator";

export class EmployeeDTO {

    @IsEnum(EmployeeType, { message: "userType inválido" })
    employeeType!: EmployeeType

}