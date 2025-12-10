import request from "supertest";
import { app } from "../src/app";
import prisma from "../src/prisma";

describe("LeisureArea E2E Tests", () => {

  beforeAll(async () => {
    await prisma.scheduling.deleteMany(); 
    await prisma.leisureArea.deleteMany();
  });

  afterAll(async () => {
    await prisma.scheduling.deleteMany();
    await prisma.leisureArea.deleteMany();
    await prisma.$disconnect();
  });

  describe("POST /leisure-areas", () => {
    it("should create a leisure area successfully", async () => {
      const payload = {
        name: "Salão de Festas",
        capacity: 50
      };

      const response = await request(app)
        .post("/leisure-areas")
        .send(payload);

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty("id");
      expect(response.body.name).toBe(payload.name);
      expect(response.body.capacity).toBe(payload.capacity);
    });

    it("should fail when name is missing", async () => {
      const response = await request(app)
        .post("/leisure-areas")
        .send({ capacity: 20 });

      expect(response.status).toBe(400);
    });
  });

  describe("GET /leisure-areas", () => {
    it("should list all leisure areas", async () => {
      await prisma.leisureArea.create({
        data: { name: "Quadra 1", capacity: 10 }
      });

      const response = await request(app).get("/leisure-areas");

      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body.length).toBeGreaterThanOrEqual(1);
    });
  });

  describe("PUT /leisure-areas/:id", () => {
    it("should update a leisure area", async () => {
      const area = await prisma.leisureArea.create({
        data: { name: "Piscina Antiga", capacity: 5 }
      });

      const response = await request(app)
        .put(`/leisure-areas/${area.id}`)
        .send({ name: "Piscina Reformada", capacity: 10 });

      expect(response.status).toBe(200);
      expect(response.body.name).toBe("Piscina Reformada");
      expect(response.body.capacity).toBe(10);

      const dbCheck = await prisma.leisureArea.findUnique({ where: { id: area.id } });
      expect(dbCheck?.name).toBe("Piscina Reformada");
    });
  });

  describe("DELETE /leisure-areas/:id", () => {
    it("should delete a leisure area", async () => {
      const area = await prisma.leisureArea.create({
        data: { name: "Área para Deletar", capacity: 5 }
      });

      const response = await request(app).delete(`/leisure-areas/${area.id}`);

      expect(response.status).toBe(204);

      const dbCheck = await prisma.leisureArea.findUnique({ where: { id: area.id } });
      expect(dbCheck).toBeNull();
    });
  });

});