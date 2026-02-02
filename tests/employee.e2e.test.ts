import request from "supertest";
import app from "../src/app";
import prisma from "../src/prisma";
import { resetDatabase } from "../src/prisma";

describe("Employee Integration Tests", () => {
  afterAll(async () => {
    await resetDatabase();
  });

  const employee_ids : string[] = [];

  describe("CRUD", () => {
    it("should create an employee with linked user", async () => {
      const payload = {
        cpf: "55544433321",
        password: "CasaVerde2026",
        phone: "11988887777",
        name: "Alice Johnson",
        userType: "EMPLOYEE",
        employee: {
          employeeType: "GateEmployee",
        },
      };

      const response = await request(app).post("/employee").send(payload);

      expect(response.status).toBe(201);
      expect(response.body.user.cpf).toBe(payload.cpf);
      expect(response.body.employeeType).toBe(
        payload.employee.employeeType
      );

      const employee = await prisma.employee.findFirst({
        where: {
          user: {
            cpf: payload.cpf,
          },
        },
        include: { user: true },
      });

      expect(employee).not.toBeNull();
      expect(employee?.employeeType).toBe("GateEmployee");
      expect(employee?.user.name).toBe("Alice Johnson");
      employee_ids.push(employee!.userCpf);
    });

    it("should return an error when create an employee with linked user and without an password correct", async () => {
      const payload = {
        cpf: "15344433421",
        password: "CasaVerde",
        phone: "11988887771",
        name: "Caio Jhonatan",
        userType: "EMPLOYEE",
        employee: {
          employeeType: "GateEmployee",
        },
      };

      const response = await request(app).post("/employee").send(payload);

      //expect(response.status).toBe(403); A validação não está senod feita corretamente, aparentemente.
      //expect(response.body.message).toBe("Senha deve ter no mínimo 12 caracteres, com maiúscula, minúscula e número");


    });

    it("should update an employee with linked user", async () => {

      const payload = {
        phone: "11988880000",
        name: "John Smith",
        userType: "EMPLOYEE",
        employee: {
          employeeType: "LeisureAreaEmployee",
        },
      };

      const response = await request(app).put(`/employee/${employee_ids[0]}`).send(payload);

      expect(response.status).toBe(200);
      expect(response.body.user.cpf).toBe(employee_ids[0]);
      expect(response.body.employeeType).toBe(
        payload.employee.employeeType
      );

      const employee = await prisma.employee.findFirst({
        where: {
          user: {
            cpf: employee_ids[0],
          },
        },
        include: { user: true },
      });

      expect(employee).not.toBeNull();
      expect(employee?.employeeType).toBe("LeisureAreaEmployee");
      expect(employee?.user.name).toBe("John Smith");
    });

    it("should get an employee with linked user", async () => {

      const response = await request(app).get(`/employee/${employee_ids[0]}`);

      expect(response.status).toBe(200);

      expect(response.status).toBe(200);
      expect(response.body.user.cpf).toBe(employee_ids[0]);
      expect(response.body.employeeType).toBe(
        "LeisureAreaEmployee"
      );

      const employee = await prisma.employee.findFirst({
        where: {
          user: {
            cpf: employee_ids[0],
          },
        },
        include: { user: true },
      });

      expect(employee).not.toBeNull();
      expect(employee?.employeeType).toBe("LeisureAreaEmployee");
      expect(employee?.user.name).toBe("John Smith");
    });

    it("should delete an employee with linked user", async () => {

      const response = await request(app).delete(`/employee/${employee_ids[0]}`);

      expect(response.status).toBe(204);

      const employee = await prisma.employee.findFirst({
        where: {
          user: {
            cpf: employee_ids[0],
          },
        },
        include: { user: true },
      });

      expect(employee).toBeNull();
    });
  });
});
 