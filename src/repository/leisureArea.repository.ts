import { LeisureAreaCreateDTO } from "../dto/leisureArea/LeisureAreaCreateDTO";
import { LeisureAreaPutDTO } from "../dto/leisureArea/LeisureAreaPutDTO";
import prisma from "../prisma";

export const LeisureAreaRepository = {

    async create(data: LeisureAreaCreateDTO) {
        return await prisma.leisureArea.create({
            data: {
                name: data.name,
                capacity: data.capacity
            }
        });
    },

    async findAll() {
        return await prisma.leisureArea.findMany();
    },

    async findById(id: number) {
        return await prisma.leisureArea.findUnique({
            where: { id }
        });
    },

    async update(id: number, data: LeisureAreaPutDTO) {
        return await prisma.leisureArea.update({
            where: { id },
            data: {
                name: data.name,
                capacity: data.capacity
            }
        });
    },

    async delete(id: number) {
        return await prisma.leisureArea.delete({
            where: { id }
        });
    }
};