import { Router } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import { VisitorController } from "../controller/visitor.controller";
import { authenticate } from "../middleware/auth.middleware";

const useRouter = Router();

/**
 * @swagger
 * tags:
 *   name: Visitor
 *   description: Rotas de visitantes
 */

/**
 * @swagger
 * /visitor:
 *   post:
 *     summary: Cria um visitante
 *     tags: [Visitor]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               cpf:
 *                 type: string
 *               name:
 *                 type: string
 *               phone:
 *                 type: string
 *               lotId:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Visitante criado com sucesso
 */
useRouter.post("/", VisitorController.create);

/**
 * @swagger
 * /visitor/{cpf}:
 *   put:
 *     summary: Atualiza um visitante
 *     tags: [Visitor]
 *     parameters:
 *       - in: path
 *         name: cpf
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Visitante atualizado
 */
useRouter.put("/:cpf", VisitorController.update);

/**
 * @swagger
 * /visitor/{cpf}:
 *   get:
 *     summary: Obtém um visitante pelo CPF
 *     tags: [Visitor]
 *     parameters:
 *       - in: path
 *         name: cpf
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Visitante retornado
 */
useRouter.get("/:cpf", VisitorController.getOne);

/**
 * @swagger
 * /visitor:
 *   get:
 *     summary: Lista todos os visitantes
 *     tags: [Visitor]
 *     responses:
 *       200:
 *         description: Lista retornada
 */
useRouter.get("/", VisitorController.getAll);

/**
 * @swagger
 * /visitor/{cpf}:
 *   delete:
 *     summary: Deleta um visitante
 *     tags: [Visitor]
 *     parameters:
 *       - in: path
 *         name: cpf
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Removido com sucesso
 */
useRouter.delete("/:cpf", VisitorController.delete);


useRouter.post("/entry-record", authenticate, asyncHandler(VisitorController.entryRecord));

export default useRouter;