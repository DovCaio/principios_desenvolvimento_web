import { LotCreateDTO } from "../dto/ lot/LotCreateDTO";
import { LotPutDTO } from "../dto/ lot/LotPutDTO";
import prisma from "../prisma";

export const LotRepository = {
  async create(data: LotCreateDTO) {
    return prisma.lot.create({
      data,
    });
  },
  async update(id: number, data: LotPutDTO) {
    return prisma.lot.update({
      where: { id },
      data,
    });
  },
  async get(id: number) {
    return prisma.lot.findUnique({
      where: { id },
    });
  },
  async getAll() {
    return prisma.lot.findMany();
  },
  async delete(id: number) {
    await prisma.lot.delete({
      where: { id },
    });
  },
  async getResidentByCpfInLot(lotId: number, cpf: string) {
    return prisma.user.findFirst({
      where: {
        cpf,
        resident: {
          lot: {
            id: lotId,
          },
        },
      },
    });
  },
  async associateResidentLot(cpf: string, lotId: number) {
    //Seria uma boa colocar isso daqui em residente repository?
    return prisma.resident.update({
      where: {
        userCpf: cpf,
      },
      data: {
        lot: {
          connect: { id: lotId },
        },
      },
      include: { user: true, lot: true },
    });
  },
  async dessociateResidentLot(cpf: string, lotId: number) {
    return prisma.resident.update({
      where: {
        userCpf: cpf,
      },
      data: {
        lot: {
          disconnect: true,
        },
      }
    });
  },
  async associateResidentLotResponsible(cpf: string, lotId: number) {
    return prisma.resident.update({
      where: {
        userCpf: cpf,
      },
      data: {
        lot: {
          connect: { id: lotId },
        },
        responsibleFor: {
          connect: { id: lotId },
        },
      },
      include: { user: true, lot: true, responsibleFor: true },
    });
  }
};
