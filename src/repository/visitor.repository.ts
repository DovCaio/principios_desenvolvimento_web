import { EntryRecordType } from "@prisma/client";
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
  },
  async getOneById(id: number) {
    return prisma.visitor.findFirst({
      where: {
        id: id,
      },
      include: { user: true}
    });
  },
  async getAll() {
    return prisma.visitor.findMany({
      include: { user: true}
    });
  },
  async delete(cpf: string) {
    await prisma.visitor.deleteMany({
      where: {
        userCpf: cpf,
      },
    });
    
    await UserRepository.delete(cpf);
  },
  async entryRecord(visitantId: number, type: EntryRecordType) {
    await prisma.entryRecord.create({
      data: {
        visitorId: visitantId,
        type: type
      }
    });
  }
};