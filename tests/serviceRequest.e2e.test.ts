import request from "supertest";
import app from "../src/app";
import prisma from "../src/prisma";

describe("ServiceRequest E2E Tests", () => {

  const mockResident = {
    cpf: "99988877700",
    name: "Tester Resident",
    phone: "11999990000",
    password: "Password123",
    userType: "RESIDENT" as const
  };

  const mockVisitor = {
    cpf: "11122233344",
    name: "Tester Visitor",
    phone: "11999991111",
    password: "Password123",
    userType: "VISITOR" as const
  };

  const mockEmployee = {
    cpf: "55566677788",
    name: "Tester Employee",
    phone: "11999992222",
    password: "Password123",
    userType: "EMPLOYEE" as const
  };

  const servicePayload = {
    description: "Lâmpada do corredor queimada",
    type: "COMMON_AREA" as const
  };

  beforeAll(async () => {
    await prisma.serviceRequest.deleteMany();
    await prisma.visitor.deleteMany();
    await prisma.resident.deleteMany();
    await prisma.employee.deleteMany();
    await prisma.user.deleteMany({
      where: { cpf: { in: [mockResident.cpf, mockVisitor.cpf, mockEmployee.cpf] } }
    });

    await prisma.user.createMany({
      data: [mockResident, mockVisitor, mockEmployee]
    });
  });

  afterAll(async () => {
    await prisma.serviceRequest.deleteMany();
    await prisma.user.deleteMany({
      where: { cpf: { in: [mockResident.cpf, mockVisitor.cpf, mockEmployee.cpf] } }
    });
    await prisma.$disconnect();
  });

  describe("POST /services", () => {
    it("should create a service request successfully as RESIDENT", async () => {
      const response = await request(app)
        .post("/services")
        .set("x-user-cpf", mockResident.cpf)
        .send(servicePayload);

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty("id");
      expect(response.body.description).toBe(servicePayload.description);
      expect(response.body.status).toBe("PENDING");
      expect(response.body.requesterCpf).toBe(mockResident.cpf);
    });

    it("should fail when VISITOR tries to create a service request", async () => {
      const response = await request(app)
        .post("/services")
        .set("x-user-cpf", mockVisitor.cpf)
        .send(servicePayload);

      expect(response.status).toBe(400);
      expect(response.body.error).toBe("Apenas moradores e funcionários podem abrir chamados.");
    });

    it("should fail when description is missing", async () => {
      const response = await request(app)
        .post("/services")
        .set("x-user-cpf", mockResident.cpf)
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

  describe("PUT /services/:id", () => {
    it("should fail when RESIDENT tries to change status", async () => {
      const newService = await prisma.serviceRequest.create({
        data: {
          description: "Teste Trava Morador",
          type: "MAINTENANCE",
          requesterCpf: mockResident.cpf,
          status: "PENDING"
        }
      });

      const response = await request(app)
        .put(`/services/${newService.id}`)
        .set("x-user-cpf", mockResident.cpf)
        .send({ status: "IN_PROGRESS" });

      expect(response.status).toBe(400);
      expect(response.body.error).toBe("Apenas funcionários podem alterar o status do chamado.");
    });

    it("should update status to IN_PROGRESS and set startedAt as EMPLOYEE", async () => {
      const newService = await prisma.serviceRequest.create({
        data: {
          description: "Teste IN_PROGRESS",
          type: "MAINTENANCE",
          requesterCpf: mockResident.cpf,
          status: "PENDING"
        }
      });

      const response = await request(app)
        .put(`/services/${newService.id}`)
        .set("x-user-cpf", mockEmployee.cpf)
        .send({ status: "IN_PROGRESS" });

      expect(response.status).toBe(200);
      expect(response.body.status).toBe("IN_PROGRESS");
      
      const updatedDb = await prisma.serviceRequest.findUnique({ where: { id: newService.id } });
      expect(updatedDb?.startedAt).not.toBeNull();
    });

    it("should update status to COMPLETED and set finishedAt as EMPLOYEE", async () => {
      const newService = await prisma.serviceRequest.create({
        data: {
          description: "Teste COMPLETED",
          type: "MAINTENANCE",
          requesterCpf: mockResident.cpf,
          status: "IN_PROGRESS"
        }
      });

      const response = await request(app)
        .put(`/services/${newService.id}`)
        .set("x-user-cpf", mockEmployee.cpf)
        .send({ status: "COMPLETED" });

      expect(response.status).toBe(200);
      expect(response.body.status).toBe("COMPLETED");

      const updatedDb = await prisma.serviceRequest.findUnique({ where: { id: newService.id } });
      expect(updatedDb?.finishedAt).not.toBeNull();
    });
  });

  describe("DELETE /services/:id", () => {
    it("should delete a service request", async () => {
      const serviceToDelete = await prisma.serviceRequest.create({
        data: {
          description: "Vou ser deletado",
          type: "OTHER",
          requesterCpf: mockResident.cpf
        }
      });

      const response = await request(app)
        .delete(`/services/${serviceToDelete.id}`);

      expect(response.status).toBe(204);

      const checkDb = await prisma.serviceRequest.findUnique({
        where: { id: serviceToDelete.id }
      });
      expect(checkDb).toBeNull();
    });
  });

});