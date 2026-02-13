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
    },

    async findById(id: number) {
        return await prisma.serviceRequest.findUnique({
            where: { id }
        });
    },

    async update(id: number, data: any) {
        return await prisma.serviceRequest.update({
            where: { id },
            data: {
                description: data.description,
                type: data.type,
                status: data.status,
                targetLotId: data.targetLotId,
                startedAt: data.startedAt,
                finishedAt: data.finishedAt
            }
        });
    },

    async delete(id: number) {
        return await prisma.serviceRequest.delete({
            where: { id }
        });
    }
};