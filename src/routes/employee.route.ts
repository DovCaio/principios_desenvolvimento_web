import { Router } from "express";
import { EmployeeController } from "../controller/employee.controller";
import { authenticate } from "../middleware/auth.middleware";

const useRouter = Router();

/**
 * @swagger
 * tags:
 *   name: Employee
 *   description: Rotas de funcionários
 */

/**
 * @swagger
 * /employee:
 *   post:
 *     summary: Cria um funcionário
 *     tags: [Employee]
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
 *               employeeType:
 *                 type: string
 *                 enum: [LeisureAreaEmployee, GateEmployee]
 *     responses:
 *       201:
 *         description: Funcionário criado com sucesso
 */
useRouter.post("/", EmployeeController.create);

/**
 * @swagger
 * /employee/{cpf}:
 *   put:
 *     summary: Atualiza um funcionário
 *     tags: [Employee]
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
 *         description: Funcionário atualizado
 */
useRouter.put("/:cpf", EmployeeController.update);

/**
 * @swagger
 * /employee/{id}:
 *   get:
 *     summary: Obtém um funcionário pelo ID
 *     tags: [Employee]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Dados retornados
 */
useRouter.get("/:cpf", EmployeeController.get);

/**
 * @swagger
 * /employee/{id}:
 *   delete:
 *     summary: Deleta um funcionário
 *     tags: [Employee]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Funcionário deletado
 */
useRouter.delete("/:cpf", EmployeeController.delete);

useRouter.put("/associate_resident/:cpf/lot/:lotId", authenticate,  EmployeeController.associateResidentLot);

useRouter.delete("/dessociate_resident/:cpf/lot/:lotId", authenticate, EmployeeController.dessociateResidentLot);

export default useRouter;
