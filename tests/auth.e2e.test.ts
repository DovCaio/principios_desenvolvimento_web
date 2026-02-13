import request from "supertest";
import app from "../src/app";
import { resetDatabase } from "../src/prisma";

describe("Employee Integration Tests", () => {
  const gate_employee_payload = {
    cpf: "22255544432",
    password: "aBc5125122fwsafafgAdae",
    phone: "21987654321",
    name: "Bob Smith",
    userType: "EMPLOYEE",
    employee: {
      employeeType: "GateEmployee",
    },
  };
  const leisure_payload = {
    cpf: "98765432109",
    password: "VERdeCasa2026",
    phone: "11988887412",
    name: "Carl Johnson",
    userType: "EMPLOYEE",
    employee: {
      employeeType: "LeisureAreaEmployee",
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
    await request(app).post("/employee").send(gate_employee_payload);
    await request(app).post("/employee").send(leisure_payload);
    await request(app).post("/resident").send(resident_payload);
    await request(app).post("/visitor").send(visitant_payload);
  });

  afterAll(async () => {
    await resetDatabase();
  });

  describe("employee auth", () => {
    it("login with a employee existent employee", async () => {
      const payload = {
        cpf: gate_employee_payload.cpf,
        password: gate_employee_payload.password,
      };

      const response = await request(app).post("/auth/login").send(payload);

      expect(response.status).toBe(200);

      expect(response.body).toHaveProperty("token");

      expect(typeof response.body.token).toBe("string");
      expect(response.body.token.length).toBeGreaterThan(20);
    });

    it("deve falhar com senha incorreta gate employee", async () => {
      const response = await request(app).post("/auth/login").send({
        cpf: gate_employee_payload.cpf,
        password: "senha_errada",
      });

      expect(response.status).toBe(401);
      expect(response.body.message).toBe("As credencias estão erradas.");
    });

    it("login with a employee existent leisure employee", async () => {
      const payload = {
        cpf: leisure_payload.cpf,
        password: leisure_payload.password,
      };

      const response = await request(app).post("/auth/login").send(payload);

      expect(response.status).toBe(200);

      expect(response.body).toHaveProperty("token");

      expect(typeof response.body.token).toBe("string");
      expect(response.body.token.length).toBeGreaterThan(20);
    });

    it("deve falhar com senha incorreta leisure employee", async () => {
      const response = await request(app).post("/auth/login").send({
        cpf: leisure_payload.cpf,
        password: "senha_errada",
      });

      expect(response.status).toBe(401);
      expect(response.body.message).toBe("As credencias estão erradas.");
    });
  });

  describe("resident auth", () => {

    it("login with a resident existent", async () => {
      const payload = {
        cpf: resident_payload.cpf,
        password: resident_payload.password,
      };

      const response = await request(app).post("/auth/login").send(payload).set("x-test-id", "1.2.3.1");

      expect(response.status).toBe(200);

      expect(response.body).toHaveProperty("token");

      expect(typeof response.body.token).toBe("string");
      expect(response.body.token.length).toBeGreaterThan(20);
    });

    it("deve falhar com senha incorreta", async () => {
      const response = await request(app).post("/auth/login").send({
        cpf: resident_payload.cpf,
        password: "senha_errada",
      }).set("x-test-id", "1.2.3.2");

      expect(response.status).toBe(401);
      expect(response.body.message).toBe("As credencias estão erradas.");
    });
  });

  describe("visitor auth", () => {
    it("login with a visitor existent", async () => {
      const payload = {
        cpf: visitant_payload.cpf,
        password: visitant_payload.password,
      };

      const response = await request(app).post("/auth/login").send(payload).set("x-test-id", "1.2.3.3");

      expect(response.status).toBe(200);

      expect(response.body).toHaveProperty("token");

      expect(typeof response.body.token).toBe("string");
      expect(response.body.token.length).toBeGreaterThan(20);
    });

    it("deve falhar com senha incorreta", async () => {
      const response = await request(app).post("/auth/login").send({
        cpf: visitant_payload.cpf,
        password: "senha_errada",
      }).set("x-test-id", "1.2.3.4");

      expect(response.status).toBe(401);
      expect(response.body.message).toBe("As credencias estão erradas.");
    });
  });

  describe("testes em comum", () => {
    it("deve falhar com cpf inexistente e senha incorreta", async () => {
      const response = await request(app).post("/auth/login").send({
        cpf: "00000000000",
        password: "senha_errada",
      }).set("x-test-id", "1.2.3.5");

      expect(response.status).toBe(401);
      expect(response.body.message).toBe("As credencias estão erradas.");
    });

    it("deve falhar com cpf errado, porém senha correta employee", async () => {
      const response = await request(app).post("/auth/login").send({
        cpf: "11111111111",
        password: gate_employee_payload.password,
      }).set("x-test-id", "1.2.3.6");

      expect(response.status).toBe(401);
      expect(response.body.message).toBe("As credencias estão erradas.");
    });

    it("deve falhar com cpf errado, porém senha correta employee", async () => {
      const response = await request(app).post("/auth/login").send({
        cpf: "55555555555",
        password: gate_employee_payload.password,
      });

      expect(response.status).toBe(401);
      expect(response.body.message).toBe("As credencias estão erradas.");
    });

    it("deve falhar com cpf errado, porém senha correta resident", async () => {
      const response = await request(app).post("/auth/login").send({
        cpf: "22222222222",
        password: resident_payload.password,
      }).set("x-test-id", "1.2.3.7");

      expect(response.status).toBe(401);
      expect(response.body.message).toBe("As credencias estão erradas.");
    });

    it("deve falhar com cpf errado, porém senha correta resident", async () => {
      const response = await request(app).post("/auth/login").send({
        cpf: "33333333333",
        password: visitant_payload.password,
      }).set("x-test-id", "1.2.3.8");

      expect(response.status).toBe(401);
      expect(response.body.message).toBe("As credencias estão erradas.");
    });
  });
});
