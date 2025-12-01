import request from "supertest";
import app from "../src/app";
import prisma from "../src/prisma";

describe("ServiceRequest E2E Tests", () => {

  const mockUser = {
    cpf: "99988877700",
    name: "Tester E2E",
    phone: "11999990000",
    userType: "RESIDENT" as const
  };

  const servicePayload = {
    description: "Lâmpada do corredor queimada",
    type: "COMMON_AREA"
  };

  beforeAll(async () => {
    // Limpeza inicial
    await prisma.serviceRequest.deleteMany();
    await prisma.visitor.deleteMany();
    await prisma.resident.deleteMany();
    await prisma.employee.deleteMany();
    await prisma.user.deleteMany({ where: { cpf: mockUser.cpf } });

    // Seed: Cria usuário necessário para a FK
    await prisma.user.create({ data: mockUser });
  });

  afterAll(async () => {
    // Limpeza final
    await prisma.serviceRequest.deleteMany();
    await prisma.user.deleteMany({ where: { cpf: mockUser.cpf } });
    await prisma.$disconnect();
  });

  describe("POST /services", () => {
    it("should create a service request successfully", async () => {
      const response = await request(app)
        .post("/services")
        .set("x-user-cpf", mockUser.cpf)
        .send(servicePayload);

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty("id");
      expect(response.body.description).toBe(servicePayload.description);
      expect(response.body.status).toBe("PENDING");
      expect(response.body.requesterCpf).toBe(mockUser.cpf);
    });

    it("should fail when description is missing", async () => {
      const response = await request(app)
        .post("/services")
        .set("x-user-cpf", mockUser.cpf)
        .send({ type: "MAINTENANCE" });

      expect(response.status).toBe(400);
    });

    it("should fail when header x-user-cpf is missing", async () => {
      const response = await request(app)
        .post("/services")
        .send(servicePayload);

      expect(response.status).toBe(400);
    });
  });

  describe("GET /services", () => {
    it("should list service requests", async () => {
      const response = await request(app).get("/services");

      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
      
      const createdItem = response.body.find((item: any) => item.description === servicePayload.description);
      expect(createdItem).toBeDefined();
    });
  });
});