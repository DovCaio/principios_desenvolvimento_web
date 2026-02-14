import * as bcrypt from "bcryptjs";
import request from "supertest";
import { app } from "../src/app";
import prisma from "../src/prisma";

jest.setTimeout(60000);

describe("Access Control E2E Tests", () => {
  let token: string;
  let visitorIdGuest: number;
  let visitorIdService: number;

  beforeAll(async () => {
    await prisma.accessLog.deleteMany();
    await prisma.visitor.deleteMany();
    await prisma.lot.deleteMany();
    await prisma.user.deleteMany();

    const hashedPassword = await bcrypt.hash("password123", 10);
    const userCpfGuest = "11122233344";
    const userCpfService = "55566677788";

    await prisma.user.create({
      data: {
        cpf: userCpfGuest,
        name: "Test User Guest",
        password: hashedPassword,
        phone: "11122233344",
        userType: "VISITOR",
      },
    });

    await prisma.user.create({
      data: {
        cpf: userCpfService,
        name: "Test User Service",
        password: hashedPassword,
        phone: "55566677788",
        userType: "VISITOR",
      },
    });

    const loginResponse = await request(app).post("/auth/login").send({
      cpf: userCpfGuest,
      password: "password123",
    });
    token = loginResponse.body.token;

    const lot = await prisma.lot.create({ data: { intercom: "202" } });

    const visitorGuest = await prisma.visitor.create({
      data: {
        userCpf: userCpfGuest,
        lotId: lot.id
      },
    });
    visitorIdGuest = visitorGuest.id;

    const visitorService = await prisma.visitor.create({
      data: {
        userCpf: userCpfService,
      },
    });
    visitorIdService = visitorService.id;
  });

  afterAll(async () => {
    await prisma.accessLog.deleteMany();
    await prisma.visitor.deleteMany();
    await prisma.lot.deleteMany();
    await prisma.user.deleteMany();
    await prisma.$disconnect();
  });

  describe("POST /access/entry", () => {
    it("should register entry successfully as GUEST", async () => {
      const response = await request(app)
        .post("/access/entry")
        .set("Authorization", `Bearer ${token}`)
        .send({ visitorId: visitorIdGuest });

      expect(response.status).toBe(201);
      expect(response.body.accessLog.status).toBe("OPEN");
      expect(response.body.accessLog.visitorId).toBe(visitorIdGuest);
      expect(response.body.type).toBe("GUEST");
    });

    it("should register entry successfully as SERVICE_PROVIDER", async () => {
      const response = await request(app)
        .post("/access/entry")
        .set("Authorization", `Bearer ${token}`)
        .send({ visitorId: visitorIdService });

      expect(response.status).toBe(201);
      expect(response.body.accessLog.status).toBe("OPEN");
      expect(response.body.type).toBe("SERVICE_PROVIDER");
    });

    it("should fail double entry", async () => {
      const response = await request(app)
        .post("/access/entry")
        .set("Authorization", `Bearer ${token}`)
        .send({ visitorId: visitorIdGuest });

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
      expect(response.body.length).toBeGreaterThanOrEqual(2);
    });
  });

  describe("POST /access/exit", () => {
    it("should register exit successfully", async () => {
      const response = await request(app)
        .post("/access/exit")
        .set("Authorization", `Bearer ${token}`)
        .send({ visitorId: visitorIdGuest });

      expect(response.status).toBe(200);
      expect(response.body.status).toBe("CLOSED");
      expect(response.body.exitTime).not.toBeNull();
    });

    it("should fail double exit", async () => {
      const response = await request(app)
        .post("/access/exit")
        .set("Authorization", `Bearer ${token}`)
        .send({ visitorId: visitorIdGuest });

      expect(response.status).toBe(400);
    });
  });
});