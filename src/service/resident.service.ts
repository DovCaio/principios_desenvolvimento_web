import { UserCreateDTO } from "../dto/user/UserCreateDTO";
import { UserPutDTO } from "../dto/user/UserPutDTO";
import {ResidentRepository} from "../repository/resident.repository";
import { hashPassword } from "../utils/auth";
export const ResidentService = {
    async create(userDto: UserCreateDTO) {
        userDto.password = await hashPassword(userDto.password);
        return ResidentRepository.create(userDto); 
    },
    async update(cpf: string, data: UserPutDTO) {
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
}