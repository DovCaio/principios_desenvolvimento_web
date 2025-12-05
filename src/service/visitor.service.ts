import { VisitorRepository } from "../repository/visitor.repository";

export const VisitorService = {
  async create(data: any) {
    return VisitorRepository.create(data);
  },
  async update(cpf: string, data: any) {
    return VisitorRepository.update(cpf, data);
  },
  async getOne(cpf: string) {
    return VisitorRepository.getOne(cpf);
  }
};
