import { ServiceRequestCreateDTO } from "../dto/serviceRequest/ServiceRequestCreateDTO";
import { ServiceRequestPutDTO } from "../dto/serviceRequest/ServiceRequestPutDTO";
import { ServiceRequestRepository } from "../repository/serviceRequest.repository";

export const ServiceRequestService = {

    async create(serviceDto: ServiceRequestCreateDTO) {
        if (!serviceDto.description) {
            throw new Error("A descrição é obrigatória.");
        }

        return ServiceRequestRepository.create(serviceDto);
    },

    async listAll() {
        return ServiceRequestRepository.findAll();
    },

    async update(id: number, dto: ServiceRequestPutDTO) {
        const exists = await ServiceRequestRepository.findById(id);
        if (!exists) {
            throw new Error("Solicitação de serviço não encontrada.");
        }
        return ServiceRequestRepository.update(id, dto);
    },

    async delete(id: number) {
        const exists = await ServiceRequestRepository.findById(id);
        if (!exists) {
            throw new Error("Solicitação de serviço não encontrada.");
        }
        return ServiceRequestRepository.delete(id);
    }
};