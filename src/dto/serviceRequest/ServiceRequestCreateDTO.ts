import { ServiceType } from "@prisma/client";

export interface ServiceRequestCreateDTO {
    description: string;
    type: ServiceType;
    requesterCpf: string;
    targetLotId?: number;
}