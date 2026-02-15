import { PrismaClient } from "@prisma/client";
import { UserCreateDTO } from "../dto/user/UserCreateDTO";
import { UserPutDTO } from "../dto/user/UserPutDTO";
import { ResidentRepository } from "../repository/resident.repository";
import { hashPassword } from "../utils/auth";

const prisma = new PrismaClient();

export const ResidentService = {
  async create(userDto: UserCreateDTO & { isResponsible?: boolean; lotId?: number }) {
    if (userDto.isResponsible && userDto.lotId) {
      const lot = await prisma.lot.findUnique({
        where: { id: userDto.lotId }
      });

      if (lot && lot.responsibleId) {
        throw new Error("Este lote já possui um responsável cadastrado");
      }
    }

    userDto.password = await hashPassword(userDto.password);
    return ResidentRepository.create(userDto);
  },

  async update(cpf: string, data: UserPutDTO & { isResponsible?: boolean; lotId?: number }) {
    if (data.isResponsible && data.lotId) {
      const lot = await prisma.lot.findUnique({
        where: { id: data.lotId }
      });

      if (lot && lot.responsibleId) {
        const currentResident = await prisma.resident.findUnique({
          where: { userCpf: cpf }
        });

        if (lot.responsibleId !== currentResident?.id) {
          throw new Error("Este lote já possui um responsável cadastrado");
        }
      }
    }

    return ResidentRepository.update(cpf, data);
  },

  async getOne(cpf: string) {
    return ResidentRepository.getOne(cpf);
  },

  async getAll() {
    return ResidentRepository.getAll();
  },

  async delete(cpf: string) {
    ResidentRepository.delete(cpf);
  }
};