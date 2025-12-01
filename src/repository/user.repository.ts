import { UserCreateDTO } from "../dto/user/UserCreateDTO";
import { UserPutDTO } from "../dto/user/UserPutDTO";
import prisma from "../prisma";


export const UserRepository = {
  async create(data: UserCreateDTO) {
    return prisma.user.create({
      data: {
        cpf: data.cpf,
        phone: data.phone,
        name: data.name,
        userType: data.userType,
      }
    });
  },
  async update(cpf: string, data: UserPutDTO) {
    return prisma.user.update({
      where: { cpf: cpf },
      data: {
        phone: data.phone,
        name: data.name,
        userType: data.userType,
      }
    });
  }
};
