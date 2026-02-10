import * as bcrypt from "bcryptjs";
import request from "supertest";
import { app } from "../src/app";
import prisma from "../src/prisma";

describe("Access Control E2E Tests", () => {
  let token: string;
  let visitorId: number;

  beforeAll(async () => {
    await prisma.accessLog.deleteMany();
    await prisma.visitor.deleteMany();
    await prisma.user.deleteMany();

    const hashedPassword = await bcrypt.hash("password123", 10);
    const userCpf = "11122233344";

    await prisma.user.create({
      data: {
        cpf: userCpf,
        name: "Test User Access",
        password: hashedPassword,
        phone: "11122233344",
        userType: "VISITOR",
      },
    });

    const loginResponse = await request(app).post("/auth/login").send({
      cpf: userCpf,
      password: "password123",
    });
    token = loginResponse.body.token;

    const visitor = await prisma.visitor.create({
      data: {
        userCpf: userCpf,
      },
    });
    visitorId = visitor.id;
  });

  afterAll(async () => {
    await prisma.accessLog.deleteMany();
    await prisma.visitor.deleteMany();
    await prisma.user.deleteMany();
    await prisma.$disconnect();
  });

  describe("POST /access/entry", () => {
    it("should register entry successfully", async () => {
      const response = await request(app)
        .post("/access/entry")
        .set("Authorization", `Bearer ${token}`)
        .send({ visitorId });

      expect(response.status).toBe(201);
      expect(response.body.status).toBe("OPEN");
      expect(response.body.visitorId).toBe(visitorId);
    });

    it("should fail double entry", async () => {
      const response = await request(app)
        .post("/access/entry")
        .set("Authorization", `Bearer ${token}`)
        .send({ visitorId });

      expect(response.status).toBe(400);
    });
  });

  describe("GET /access/active", () => {
    it("should list active visitors", async () => {
      const response = await request(app)
        .get("/access/active")
        .set("Authorization", `Bearer ${token}`);

      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body.length).toBeGreaterThanOrEqual(1);
    });
  });

  describe("POST /access/exit", () => {
    it("should register exit successfully", async () => {
      const response = await request(app)
        .post("/access/exit")
        .set("Authorization", `Bearer ${token}`)
        .send({ visitorId });

      expect(response.status).toBe(200);
      expect(response.body.status).toBe("CLOSED");
      expect(response.body.exitTime).not.toBeNull();
    });

    it("should fail double exit", async () => {
      const response = await request(app)
        .post("/access/exit")
        .set("Authorization", `Bearer ${token}`)
        .send({ visitorId });

      expect(response.status).toBe(400);
    });
  });
});