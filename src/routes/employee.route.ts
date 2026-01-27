import { Router } from "express";
import { EmployeeControler } from "../controller/employee.controller";

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
useRouter.post("/", EmployeeControler.create);

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
useRouter.put("/:cpf", EmployeeControler.update);

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
useRouter.get("/:cpf", EmployeeControler.get);

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
useRouter.delete("/:cpf", EmployeeControler.delete);


export default useRouter;
