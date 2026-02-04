import { EmployeeType } from "@prisma/client";
import { IsEnum, IsNotEmpty, IsString, Length } from "class-validator";

export class EmployeeCreateDTO {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsString()
    @Length(11, 11, { message: "CPF deve ter exatamente 11 dígitos" })
    cpf: string;

    @IsNotEmpty()
    @IsString()
    phone: string;

    @IsNotEmpty()
    @IsString()
    password: string;

    @IsNotEmpty()
    @IsEnum(EmployeeType, { message: "Tipo de funcionário inválido" })
    employeeType: EmployeeType;
}