import { ServiceStatus, ServiceType } from "@prisma/client";

export interface ServiceRequestPutDTO {
    description?: string;      
    type?: ServiceType;        
    status?: ServiceStatus;   
    targetLotId?: number;      
}