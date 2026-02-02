import { UserCreateDTO } from "../dto/user/UserCreateDTO";
import { UserPutDTO } from "../dto/user/UserPutDTO";
import prisma from "../prisma";


export const UserRepository = {
  async create(data: UserCreateDTO) {
    return prisma.user.create({
      data: {
        cpf: data.cpf,
        password: data.password,
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
    })
  },
  async delete(cpf: string) {
    await prisma.user.delete({
      where: { cpf: cpf },
    });
  }
};
