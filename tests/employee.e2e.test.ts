import request from "supertest";
import app from "../src/app"; // seu Express
import prisma from "../src/prisma";
import { resetDatabase } from "../src/prisma";

describe("Employee Integration Tests", () => {
  afterAll(async () => {
    await resetDatabase();
  });

  describe("CRUD", () => {
    it("should create an employee with linked user", async () => {
      const payload = {
        cpf: "55544433321",
        phone: "11988887777",
        name: "Alice Johnson",
        userType: "EMPLOYEE",
        employee: {
          employeeType: "GateEmployee",
        },
      };

      const response = await request(app).post("/employee").send(payload);

      console.log(response.body);

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
    });
  });
});
