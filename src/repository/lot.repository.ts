import prisma from "../prisma";

export const LotRepository = {

    async create(data: any) {

        return prisma.lot.create({
            data
        });
    }

}