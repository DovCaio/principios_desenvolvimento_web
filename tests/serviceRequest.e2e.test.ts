import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";
import request from "supertest";
import { app } from "../src/app";

jest.setTimeout(30000);

const prisma = new PrismaClient();

describe("Scheduling E2E Tests", () => {
  let areaId: number;
  let token: string;
  const userCpf = "12345678901";

  beforeAll(async () => {
    await prisma.scheduling.deleteMany();
    await prisma.leisureArea.deleteMany();
    await prisma.user.deleteMany();

    await prisma.user.create({
      data: {
        cpf: userCpf,
        name: "Teste Scheduler",
        password: "hashed_password",
        phone: "999999999",
        userType: "RESIDENT"
      }
    });

    const area = await prisma.leisureArea.create({
      data: { 
        name: "Piscina Teste", 
        capacity: 2,
        openHour: "08:00", 
        closeHour: "22:00" 
      }
    });
    areaId = area.id;

    token = jwt.sign({ cpf: userCpf }, process.env.JWT_SECRET || "secret", {
      expiresIn: "1h",
    });
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  it("should create a scheduling successfully", async () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const dateStr = tomorrow.toISOString().split("T")[0];

    const res = await request(app)
      .post("/api/scheduling")
      .set("Authorization", `Bearer ${token}`)
      .send({
        leisureAreaId: areaId,
        startTime: `${dateStr}T10:00:00.000Z`,
        endTime: `${dateStr}T11:00:00.000Z`
      });

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty("id");
  });

  it("should fail when scheduling causes collision", async () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const dateStr = tomorrow.toISOString().split("T")[0];

    const res = await request(app)
      .post("/api/scheduling")
      .set("Authorization", `Bearer ${token}`)
      .send({
        leisureAreaId: areaId,
        startTime: `${dateStr}T10:30:00.000Z`,
        endTime: `${dateStr}T11:30:00.000Z`
      });

    expect(res.status).toBe(400);
    expect(res.body.message).toBe("Você já possui um agendamento neste horário");
  });

  it("should fail when scheduling outside operating hours", async () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const dateStr = tomorrow.toISOString().split("T")[0];

    const res = await request(app)
      .post("/api/scheduling")
      .set("Authorization", `Bearer ${token}`)
      .send({
        leisureAreaId: areaId,
        startTime: `${dateStr}T06:00:00.000Z`,
        endTime: `${dateStr}T07:00:00.000Z`
      });

    expect(res.status).toBe(400);
    expect(res.body.message).toBe("O agendamento está fora do horário de funcionamento");
  });
});