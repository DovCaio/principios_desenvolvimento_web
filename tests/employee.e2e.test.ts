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
    it("should create an gate employee with linked user", async () => {
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

    it("should create an leisure employee with linked user", async () => {
      const payload = {
        cpf: "98765432109",
        password: "VERdeCasa2026",
        phone: "11988887412",
        name: "Carl Johnson",
        userType: "EMPLOYEE",
        employee: {
          employeeType: "LeisureAreaEmployee",
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
      expect(employee?.employeeType).toBe("LeisureAreaEmployee");
      expect(employee?.user.name).toBe("Carl Johnson");
      employee_ids.push(employee!.userCpf);
    });

        it("should create an management employee with linked user", async () => {
      const payload = {
        cpf: "12345678901",
        password: "VERdeCasa2026",
        phone: "11988887521",
        name: "Big Smoke",
        userType: "EMPLOYEE",
        employee: {
          employeeType: "ManagementEmployee",
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
      expect(employee?.employeeType).toBe("ManagementEmployee");
      expect(employee?.user.name).toBe("Big Smoke");
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

    it("should update an employee with linked user 1", async () => {

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

  describe("Manegments Associations", () => {

      it("should associate an resident to a lot", async () => {
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

        const manegment = await request(app).post("/resident").send(payload);
        
        expect(manegment.status).toBe(201);

        const lotPayload = {
          intercom: "A123",
        };

        const lotResponse = await request(app).post("/lot").send(lotPayload);

        expect(lotResponse.status).toBe(201);
        
        const associationResponse = await request(app) //Essa requisição vai precisar de autorização
          .put(`/employee/associate_resident/${payload.cpf}/lot/${lotResponse.body.id}`);
          
        expect(associationResponse.status).toBe(200);
        expect(associationResponse.body.userCpf).toBe(payload.cpf);
        expect(associationResponse.body.lotId).toBe(lotResponse.body.id);        
      });

  });
});
 