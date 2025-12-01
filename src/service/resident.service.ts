import { UserPutDTO } from "../dto/user/UserPutDTO";
import {ResidentRepository} from "../repository/resident.repository";
export const ResidentService = {
    async create(data: any) {
        return ResidentRepository.create(data); 
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