import * as bcrypt from "bcryptjs";
import request from "supertest";
import { app } from "../src/app";
import prisma from "../src/prisma";

describe("Scheduling E2E Tests", () => {
  let token: string;
  let leisureAreaId: number;
  let userCpf: string;

  beforeAll(async () => {
    await prisma.scheduling.deleteMany();
    await prisma.leisureArea.deleteMany();
    await prisma.user.deleteMany();

    const hashedPassword = await bcrypt.hash("password123", 10);

    userCpf = "99988877700";
    
    await prisma.user.create({
      data: {
        cpf: userCpf,
        name: "Test User Scheduling",
        password: hashedPassword,
        phone: "99988877700",
        userType: "RESIDENT",
      },
    });

    const loginResponse = await request(app).post("/auth/login").send({
      cpf: userCpf,
      password: "password123",
    });
    token = loginResponse.body.token;

    const area = await prisma.leisureArea.create({
      data: {
        name: "Quadra E2E",
        capacity: 10,
        openHour: "08:00",
        closeHour: "22:00",
      },
    });
    leisureAreaId = area.id;
  });

  afterAll(async () => {
    await prisma.scheduling.deleteMany();
    await prisma.leisureArea.deleteMany();
    await prisma.user.deleteMany();
    await prisma.$disconnect();
  });

  describe("POST /scheduling", () => {
    it("should create a scheduling successfully", async () => {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      tomorrow.setHours(14, 0, 0, 0);

      const endTime = new Date(tomorrow);
      endTime.setHours(15, 0, 0, 0);

      const payload = {
        leisureAreaId: leisureAreaId,
        startTime: tomorrow.toISOString(),
        endTime: endTime.toISOString(),
      };

      const response = await request(app)
        .post("/scheduling")
        .set("Authorization", `Bearer ${token}`)
        .send(payload);

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty("id");
      expect(response.body.userCpf).toBe(userCpf);
    });

    it("should fail when scheduling causes collision", async () => {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      tomorrow.setHours(14, 30, 0, 0);

      const endTime = new Date(tomorrow);
      endTime.setHours(15, 30, 0, 0);

      const payload = {
        leisureAreaId: leisureAreaId,
        startTime: tomorrow.toISOString(),
        endTime: endTime.toISOString(),
      };

      const response = await request(app)
        .post("/scheduling")
        .set("Authorization", `Bearer ${token}`)
        .send(payload);

      expect(response.status).toBe(400);
    });

    it("should fail when scheduling outside operating hours", async () => {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      tomorrow.setHours(23, 0, 0, 0);

      const endTime = new Date(tomorrow);
      endTime.setHours(23, 59, 0, 0);

      const payload = {
        leisureAreaId: leisureAreaId,
        startTime: tomorrow.toISOString(),
        endTime: endTime.toISOString(),
      };

      const response = await request(app)
        .post("/scheduling")
        .set("Authorization", `Bearer ${token}`)
        .send(payload);

      expect(response.status).toBe(400);
    });
  });
});