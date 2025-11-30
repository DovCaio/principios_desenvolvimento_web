import { IsNotEmpty, IsString, Matches } from "class-validator";

export class LotCreateDTO {

    @IsNotEmpty()
    @IsString()
    @Matches(/^[A-Za-z]\d{3}$/, { message: "O intercomunicador deve seguir o padrão 1 Letra e 3 numeros" })
    intercom: string;

}