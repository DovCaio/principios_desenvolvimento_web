import { PrismaClient } from "@prisma/client";
import * as bcrypt from "bcryptjs";
import request from "supertest";
import { app } from "../src/app";

jest.setTimeout(60000);

const prisma = new PrismaClient();

describe("ServiceRequest E2E Tests", () => {
  const residentCpf = "12345678910";
  const employeeCpf = "10987654321";
  let residentToken: string;
  let employeeToken: string;
  let serviceId: number;

  beforeAll(async () => {
    await prisma.auditLog.deleteMany(); 
    await prisma.serviceRequest.deleteMany();
    await prisma.user.deleteMany();

    const hashedPassword = await bcrypt.hash("password123", 10);

    await prisma.user.create({
      data: { cpf: residentCpf, name: "Morador Teste", password: hashedPassword, phone: "1111", userType: "RESIDENT" }
    });

    await prisma.user.create({
      data: { cpf: employeeCpf, name: "Funcionario Teste", password: hashedPassword, phone: "2222", userType: "EMPLOYEE" }
    });

    const residentLogin = await request(app)
      .post("/auth/login")
      .send({ cpf: residentCpf, password: "password123" })
      .set("x-test-id", "service-test-1");
    residentToken = residentLogin.body.token;

    const employeeLogin = await request(app)
      .post("/auth/login")
      .send({ cpf: employeeCpf, password: "password123" })
      .set("x-test-id", "service-test-2");
    employeeToken = employeeLogin.body.token;
  });

  afterAll(async () => {
    await prisma.auditLog.deleteMany();
    await prisma.serviceRequest.deleteMany();
    await prisma.user.deleteMany();
    await prisma.$disconnect();
  });

  describe("POST /services", () => {
    it("should fail when description is missing", async () => {
      const res = await request(app)
        .post("/services")
        .set("Authorization", `Bearer ${residentToken}`)
        .set("x-user-cpf", residentCpf)
        .set("x-test-id", "service-test-missing-desc")
        .send({ type: "MAINTENANCE" }); // Sem descrição

      expect(res.status).toBe(400); 
    });

    it("should allow a RESIDENT to create a request", async () => {
      const res = await request(app)
        .post("/services")
        .set("Authorization", `Bearer ${residentToken}`)
        .set("x-user-cpf", residentCpf)
        .set("x-test-id", "service-test-3")
        .send({
          description: "Vazamento na piscina",
          type: "MAINTENANCE"
        });

      expect(res.status).toBe(201);
      expect(res.body).toHaveProperty("id");
      serviceId = res.body.id;
    });

    it("should block an EMPLOYEE from creating a request", async () => {
      const res = await request(app)
        .post("/services")
        .set("Authorization", `Bearer ${employeeToken}`)
        .set("x-user-cpf", employeeCpf)
        .set("x-test-id", "service-test-4")
        .send({ description: "Limpar hall", type: "CLEANING" });

      expect(res.status).toBe(400); 
    });
  });

  describe("GET /services", () => {
    it("should list all requests", async () => {
      const res = await request(app)
        .get("/services")
        .set("Authorization", `Bearer ${employeeToken}`)
        .set("x-test-id", "service-test-list");

      expect(res.status).toBe(200);
      expect(res.body.length).toBeGreaterThan(0);
    });
  });

  describe("PUT /services/:id", () => {
    it("should fail when updating non-existent request", async () => {
      const res = await request(app)
        .put("/services/99999")
        .set("Authorization", `Bearer ${employeeToken}`)
        .set("x-user-cpf", employeeCpf)
        .set("x-test-id", "service-test-non-existent")
        .send({ status: "IN_PROGRESS" });

      expect(res.status).toBe(400);
    });

    it("should block RESIDENT from changing the status", async () => {
      const res = await request(app)
        .put(`/services/${serviceId}`)
        .set("Authorization", `Bearer ${residentToken}`)
        .set("x-user-cpf", residentCpf)
        .set("x-test-id", "service-test-5")
        .send({ status: "IN_PROGRESS" });

      expect(res.status).toBe(400); 
    });

    it("should allow EMPLOYEE to start the service", async () => {
      const res = await request(app)
        .put(`/services/${serviceId}`)
        .set("Authorization", `Bearer ${employeeToken}`)
        .set("x-user-cpf", employeeCpf)
        .set("x-test-id", "service-test-6")
        .send({ status: "IN_PROGRESS" });

      expect(res.status).toBe(200);
    });

    it("should allow EMPLOYEE to finish the service", async () => {
      const res = await request(app)
        .put(`/services/${serviceId}`)
        .set("Authorization", `Bearer ${employeeToken}`)
        .set("x-user-cpf", employeeCpf)
        .set("x-test-id", "service-test-7")
        .send({ status: "COMPLETED" });

      expect(res.status).toBe(200);
    });
  });

  describe("DELETE /services/:id", () => {
    it("should fail when deleting non-existent request", async () => {
      const res = await request(app)
        .delete("/services/99999")
        .set("Authorization", `Bearer ${employeeToken}`)
        .set("x-test-id", "service-test-del-fail");

      expect(res.status).toBe(400);
    });

    it("should delete the request successfully", async () => {
      const res = await request(app)
        .delete(`/services/${serviceId}`)
        .set("Authorization", `Bearer ${employeeToken}`)
        .set("x-test-id", "service-test-del-success");

      expect(res.status).toBe(204);
    });
  });
});