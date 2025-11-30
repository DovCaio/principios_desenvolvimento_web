import { IsOptional, IsString, Matches } from "class-validator";

export class LotPutDTO {

    @IsOptional()
    @IsString()
    @Matches(/^[A-Za-z]\d{3}$/, { message: "O intercomunicador deve seguir o padrão 1 Letra e 3 numeros" })
    intercom?: string;

    //Para colocar mais atributos de lot, é melhor fazer com path, pois seria necessário operações no banco de dados, porém é discutível
}