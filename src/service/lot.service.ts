import { LotRepository } from "../repository/lot.repository";
import { LotCreateDTO } from "../dto/ lot/LotCreateDTO";
import { LotPutDTO } from "../dto/ lot/LotPutDTO";

export const LotService = {
    async create(data: LotCreateDTO) {
        const lot = await LotRepository.create(data);
        return lot;
    },
    async update(id: number, data: LotPutDTO) {
        const lot = await LotRepository.update(id, data);
        return lot;
    },
    async get(id: number) {
        const lot = await LotRepository.get(id);
        return lot;
    },
    async getAll() {
        const lots = await LotRepository.getAll();
        return lots;
    },
    async delete(id: number) {
        await LotRepository.delete(id);
    }
}