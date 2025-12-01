import { UserCreateDTO } from "../dto/user/UserCreateDTO";
import { UserPutDTO } from "../dto/user/UserPutDTO";
import prisma from "../prisma";
import { UserRepository } from "./user.repository"; 

export const ResidentRepository = {

    async create(data: UserCreateDTO) {

        const user = await UserRepository.create(data);
           
        return prisma.resident.create({
            data: {
                user: {
                    connect: { cpf: data.cpf }, 
                },
            },
            include: { user: true }
        });
    },
    
    async update(cpf: string, data: UserPutDTO) {
        const user = await UserRepository.update(cpf, data);

        return prisma.resident.findFirst({
            where: {
                user: {
                    cpf: cpf,
                },
            },
            include: { user: true },
        });
    },
    async getOne(cpf: string) {
        return prisma.resident.findFirst({
            where: {
                user: {
                    cpf: cpf,
                },
            },
            include: { user: true },
        });
    }
}