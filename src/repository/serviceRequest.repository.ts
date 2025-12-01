import { ServiceRequestCreateDTO } from "../dto/serviceRequest/ServiceRequestCreateDTO";
import prisma from "../prisma";

export const ServiceRequestRepository = {

    async create(data: ServiceRequestCreateDTO) {
        return await prisma.serviceRequest.create({
            data: {
                description: data.description,
                type: data.type,
                requesterCpf: data.requesterCpf,
                targetLotId: data.targetLotId,
                status: "PENDING"
            }
        });
    },

    async listByUser(cpf: string) {
        return await prisma.serviceRequest.findMany({
            where: { requesterCpf: cpf },
            orderBy: { createdAt: 'desc' }
        });
    },

    async findAll() {
        return await prisma.serviceRequest.findMany({
            orderBy: { createdAt: 'desc' }
        });
    }
};