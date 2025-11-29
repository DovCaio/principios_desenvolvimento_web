import { LotRepository } from "../repository/lot.repository";

export const LotService = {
    async create(data: any) {
        const lot = await LotRepository.create(data);
        return lot;
    },
    async update(id: number, data: any) {
        const lot = await LotRepository.update(id, data);
        return lot;
    }
}