import request from "supertest";
import { app } from "../src/app";
import prisma from "../src/prisma";

describe("Rate Limit E2E Tests", () => {
  beforeAll(async () => {
    await prisma.user.deleteMany();
  });

  afterAll(async () => {
    await prisma.user.deleteMany();
    await prisma.$disconnect();
  });

  it("should block requests after exceeding the limit", async () => {
    for (let i = 0; i < 5; i++) {
      const response = await request(app).post("/auth/login").send({
        cpf: "00000000000",
        password: "random_password",
      });
      expect(response.status).not.toBe(429);
    }

    const response = await request(app).post("/auth/login").send({
      cpf: "00000000000",
      password: "random_password",
    });

    expect(response.status).toBe(429);
  });
});