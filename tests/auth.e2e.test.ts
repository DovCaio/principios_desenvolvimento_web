import request from "supertest";
import app from "../src/app";
import prisma from "../src/prisma";
import { resetDatabase } from "../src/prisma";

describe("Employee Integration Tests", () => {
  const employee_payload = {
    cpf: "22255544432",
    password: "aBc5125122fwsafafgAdae",
    phone: "21987654321",
    name: "Bob Smith",
    userType: "EMPLOYEE",
    employee: {
      employeeType: "GateEmployee",
    },
  };

  const resident_payload = {
    cpf: "12345678902",
    phone: "11999998888",
    name: "Bob Williams",
    password: "SENHAmuitoforte1",
    userType: "RESIDENT",
  };

  const visitant_payload = {
    cpf: "00044433321",
    phone: "11988887777",
    name: "Nolan Smith",
    password: "SENHAFROtissima112421!",
    userType: "VISITOR",
  };

  beforeAll(async () => {
    const response1 = await request(app)
      .post("/employee")
      .send(employee_payload);
    const response2 = await request(app)
      .post("/resident")
      .send(resident_payload);
    const response3 = await request(app)
      .post("/visitant")
      .send(visitant_payload);
  });

  afterAll(async () => {
    await resetDatabase();
  });

  describe("employee auth", () => {
    it("login with a employee existent", async () => {
      const payload = {
        cpf: employee_payload.cpf,
        password: employee_payload.password,
      };

      const response = await request(app).post("/auth/login").send(payload);

      expect(response.status).toBe(200);

      expect(response.body).toHaveProperty("token");

      expect(typeof response.body.token).toBe("string");
      expect(response.body.token.length).toBeGreaterThan(20);
    });

    it("deve falhar com senha incorreta", async () => {
      const response = await request(app).post("/auth/login").send({
        cpf: employee_payload.cpf,
        password: "senha_errada",
      });

      expect(response.status).toBe(401);
    });
  });
});
