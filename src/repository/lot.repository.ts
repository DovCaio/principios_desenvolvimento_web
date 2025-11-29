import { LotCreateDTO } from "../dto/ lot/LotCreateDTO";
import { LotPutDTO } from "../dto/ lot/LotPutDTO";
import prisma from "../prisma";

export const LotRepository = {

    async create(data: LotCreateDTO) {

        return prisma.lot.create({
            data
        });
    },
    async update(id: number, data: LotPutDTO) { 
        return prisma.lot.update({
            where: { id },
            data
        });
    }

}