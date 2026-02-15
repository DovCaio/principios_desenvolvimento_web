import { Router } from "express";
import { ServiceRequestController } from "../controller/serviceRequest.controller";

const serviceRoutes = Router();

/**
 * @swagger
 * tags:
 * name: ServiceRequest
 * description: Rotas para solicitações de serviço
 */

/**
 * @swagger
 * /services:
 * post:
 * summary: Cria uma solicitação de serviço
 * tags: [ServiceRequest]
 * requestBody:
 * required: true
 * content:
 * application/json:
 * schema:
 * type: object
 * properties:
 * description:
 * type: string
 * type:
 * type: string
 * enum: [MAINTENANCE, CLEANING, COMMON_AREA, OTHER]
 * requesterCpf:
 * type: string
 * targetLotId:
 * type: integer
 * responses:
 * 201:
 * description: Solicitação criada com sucesso
 */
serviceRoutes.post("/", ServiceRequestController.create);

/**
 * @swagger
 * /services:
 * get:
 * summary: Lista todas as solicitações de serviço
 * tags: [ServiceRequest]
 * responses:
 * 200:
 * description: Lista retornada
 */
serviceRoutes.get("/", ServiceRequestController.list);

/**
 * @swagger
 * /services/{id}:
 * put:
 * summary: Atualiza uma solicitação de serviço
 * tags: [ServiceRequest]
 * parameters:
 * - in: path
 * name: id
 * required: true
 * schema:
 * type: integer
 * requestBody:
 * required: true
 * content:
 * application/json:
 * schema:
 * type: object
 * responses:
 * 200:
 * description: Solicitação atualizada
 */
serviceRoutes.put("/:id", ServiceRequestController.update);

/**
 * @swagger
 * /services/{id}:
 * delete:
 * summary: Remove uma solicitação de serviço
 * tags: [ServiceRequest]
 * parameters:
 * - in: path
 * name: id
 * required: true
 * schema:
 * type: integer
 * responses:
 * 204:
 * description: Solicitação removida
 */
serviceRoutes.delete("/:id", ServiceRequestController.delete);

export { serviceRoutes };

