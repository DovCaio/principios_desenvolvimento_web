import { EmployeeType } from "@prisma/client";
import { IsEnum, IsOptional, IsString } from "class-validator";

export class EmployeePutDTO {
    @IsOptional()
    @IsString()
    name?: string;

    @IsOptional()
    @IsString()
    phone?: string;

    @IsOptional()
    @IsEnum(EmployeeType)
    type?: EmployeeType;
}