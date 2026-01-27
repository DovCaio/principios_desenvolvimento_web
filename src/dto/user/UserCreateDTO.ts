import { UserType } from "@prisma/client";
import { IsEnum, IsNotEmpty, IsOptional, IsString, Length } from "class-validator";
import { EmployeeCreateDTO } from "../employee/EmployeeCreateDTO";

export class UserCreateDTO {
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
  employee?: EmployeeCreateDTO

}
