import { UserType } from "@prisma/client";
import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsStrongPassword,
  Length,
} from "class-validator";
import { EmployeeCreateDTO } from "../employee/EmployeeCreateDTO";

export class UserCreateDTO {
  @IsString()
  @Length(11, 11, { message: "CPF deve ter exatamente 11 dígitos" })
  cpf!: string;

  @IsStrongPassword(
    {
      minLength: 12,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 0,
    },
    {
      message:
        "Senha deve ter no mínimo 12 caracteres, com maiúscula, minúscula e número",
    },
  )
  password!: string;

  @IsString()
  @IsNotEmpty()
  phone!: string;

  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsEnum(UserType, { message: "userType inválido" })
  userType!: UserType;

  @IsOptional()
  employee?: EmployeeCreateDTO;
}
