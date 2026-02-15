import { ServiceRequestCreateDTO } from "../dto/serviceRequest/ServiceRequestCreateDTO";
import { ServiceRequestPutDTO } from "../dto/serviceRequest/ServiceRequestPutDTO";
import prisma from "../prisma";
import { ServiceRequestRepository } from "../repository/serviceRequest.repository";

export const ServiceRequestService = {

    async create(serviceDto: ServiceRequestCreateDTO) {
        if (!serviceDto.description) {
            throw new Error("A descrição é obrigatória.");
        }

        const user = await prisma.user.findUnique({
            where: { cpf: serviceDto.requesterCpf }
        });

        if (!user || user.userType !== "RESIDENT") {
            throw new Error("Apenas moradores podem abrir chamados.");
        }

        const dataToSave = { 
            ...serviceDto, 
            status: "PENDING" as any 
        };

        return ServiceRequestRepository.create(dataToSave);
    },

    async listAll() {
        return ServiceRequestRepository.findAll();
    },

    async update(id: number, updaterCpf: string, dto: ServiceRequestPutDTO) {
        const exists = await ServiceRequestRepository.findById(id);
        
        if (!exists) {
            throw new Error("Solicitação de serviço não encontrada.");
        }

        const user = await prisma.user.findUnique({
            where: { cpf: updaterCpf }
        });

        if (!user) {
            throw new Error("Usuário não encontrado.");
        }

        let updateData: any = { ...dto };

        if (dto.status && dto.status !== exists.status) {
            if (user.userType !== "EMPLOYEE") {
                throw new Error("Apenas funcionários podem alterar o status do chamado.");
            }

            if (dto.status === "IN_PROGRESS") {
                if (exists.status !== "PENDING") {
                    throw new Error("Apenas chamados pendentes podem ser iniciados.");
                }
                updateData.startedAt = new Date();
            } else if (dto.status === "COMPLETED") {
                if (exists.status !== "IN_PROGRESS") {
                    throw new Error("Apenas chamados em progresso podem ser finalizados.");
                }
                updateData.finishedAt = new Date();
            }
        }

        return ServiceRequestRepository.update(id, updateData);
    },

    async delete(id: number) {
        const exists = await ServiceRequestRepository.findById(id);
        
        if (!exists) {
            throw new Error("Solicitação de serviço não encontrada.");
        }
        
        return ServiceRequestRepository.delete(id);
    }
};