import { LeisureAreaCreateDTO } from "../dto/leisureArea/LeisureAreaCreateDTO";
import { LeisureAreaPutDTO } from "../dto/leisureArea/LeisureAreaPutDTO";
import { LeisureAreaRepository } from "../repository/leisureArea.repository";

export const LeisureAreaService = {

    async create(dto: LeisureAreaCreateDTO) {
        if (!dto.name) {
            throw new Error("O nome da área de lazer é obrigatório.");
        }
        if (dto.capacity <= 0) {
            throw new Error("A capacidade deve ser maior que zero.");
        }
        return LeisureAreaRepository.create(dto);
    },

    async listAll() {
        return LeisureAreaRepository.findAll();
    },

    async update(id: number, dto: LeisureAreaPutDTO) {
        const exists = await LeisureAreaRepository.findById(id);
        if (!exists) {
            throw new Error("Área de lazer não encontrada.");
        }
        return LeisureAreaRepository.update(id, dto);
    },

    async delete(id: number) {
        const exists = await LeisureAreaRepository.findById(id);
        if (!exists) {
            throw new Error("Área de lazer não encontrada.");
        }
        return LeisureAreaRepository.delete(id);
    }
};