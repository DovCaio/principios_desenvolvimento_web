import { UserType } from "@prisma/client";
import {EmployeeDTO} from "./EmployeeDTO"
import { IsEnum, IsNotEmpty, IsString, Length, IsOptional } from "class-validator";

export class UserDTO {
  @IsString()
  @Length(11, 11, { message: "CPF deve ter exatamente 11 dígitos" })
  cpf!: string;

  @IsString()
  @IsNotEmpty()
  phone!: string;

  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsEnum(UserType, { message: "userType inválido" })
  userType!: UserType;

  @IsOptional()
  employee?: EmployeeDTO
}
