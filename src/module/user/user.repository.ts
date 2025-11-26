import { UserDTO } from "../../dto/UserDTO";
import prisma from "../../prisma";


export const UserRepository = {
  async create(data: UserDTO) {
    return prisma.user.create({
      data: {
        cpf: data.cpf,
        phone: data.phone,
        name: data.name,
        userType: data.userType,
      }
    });
  }
};
