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
    },
    async get(id: number) {
        return prisma.lot.findUnique({
            where: { id }
        });
    },
    async getAll() {
        return prisma.lot.findMany();
    },
    async delete(id: number) {
        await prisma.lot.delete({
            where: { id }
        });
    }

}