import prisma from "../prisma";

export const LotRepository = {

    async create(data: any) {

        return prisma.lot.create({
            data
        });
    },
    async update(id: number, data: any) { 
        return prisma.lot.update({
            where: { id },
            data
        });
    }

}