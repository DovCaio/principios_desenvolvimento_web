import { ServiceRequestCreateDTO } from "../dto/serviceRequest/ServiceRequestCreateDTO";
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
    }
};