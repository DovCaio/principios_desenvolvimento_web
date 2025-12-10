import { IsInt, IsNotEmpty, IsString, Min } from "class-validator";

export class LeisureAreaCreateDTO {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsInt()
    @Min(1, { message: "A capacidade deve ser maior que zero." })
    capacity: number;
}