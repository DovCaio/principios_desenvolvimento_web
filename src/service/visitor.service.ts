import { UserCreateDTO } from "../dto/user/UserCreateDTO";
import { UserNotExistsException } from "../exceptions/UserNotExistsException";
import { VisitorRepository } from "../repository/visitor.repository";
import { hashPassword } from "../utils/auth";
import { EntryRecordType } from "@prisma/client";


export const VisitorService = {
  async create(userDto: UserCreateDTO) {
    userDto.password = await hashPassword(userDto.password)
    return VisitorRepository.create(userDto);
  },
  async update(cpf: string, data: any) {
    return VisitorRepository.update(cpf, data);
  },
  async getOne(cpf: string) {
    return VisitorRepository.getOne(cpf);
  },
  async getAll() {
    return VisitorRepository.getAll();
  },
  async delete(cpf: string) {
    await VisitorRepository.delete(cpf);
  },
  async entryRecord(visitantId: number, type: EntryRecordType) {
    const visitor = await VisitorRepository.getOneById(visitantId);
    if (!visitor) {
      throw new UserNotExistsException();
    }

    await VisitorRepository.entryRecord(visitantId, type);

  }
};
