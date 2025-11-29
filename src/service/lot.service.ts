import { LotRepository } from "../repository/lot.repository";

export const LotService = {
    async create(data: any) {
        const lot = await LotRepository.create(data);
        return lot;
    }
}