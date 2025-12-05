import { UserCreateDTO } from "../dto/user/UserCreateDTO";
import { UserPutDTO } from "../dto/user/UserPutDTO";
import prisma from "../prisma";
import { UserRepository } from "./user.repository";


export const VisitorRepository = {
  async create(data: UserCreateDTO) {
    const user = await UserRepository.create(data);

    return prisma.visitor.create({
      data: {
        user: {
            connect: { cpf: user.cpf }
        }
      },
      include: { user: true}
    });
  },
    async update(cpf: string, data: UserPutDTO) {
    const user = await UserRepository.update(cpf, data)
    return prisma.visitor.findFirst({
      where: {
        userCpf: cpf,
      },
      include: { user: true}
    });
  },
  async getOne(cpf: string) {
    return prisma.visitor.findFirst({
      where: {
        userCpf: cpf,
      },
      include: { user: true}
    });
  }
};