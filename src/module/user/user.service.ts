import { UserRepository } from "./user.repository";

export const UserService = {
  findAll() {
    return UserRepository.findAll();
  },

  findById(id: number) {
    return UserRepository.findById(id);
  },

  create(data: any) {
    return UserRepository.create(data);
  }
};
