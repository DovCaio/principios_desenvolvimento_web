import request from "supertest";
import app from "../src/app"; // seu Express
import prisma from "../src/prisma";
import { resetDatabase } from "../src/prisma";
import e from "express";

describe("Employee Integration Tests", () => {
  afterAll(async () => {
    await resetDatabase();
  });

  describe("CRUD", () => {
    it("should post an resident", async () => {
      const payload = {
        cpf: "12345678902",
        phone: "11999998888",
        name: "Bob Williams",
        userType: "RESIDENT",
      };

      const response = await request(app).post("/resident").send(payload);

      expect(response.status).toBe(201);
      expect(response.body.user.cpf).toBe(payload.cpf);
      expect(response.body.user.name).toBe(payload.name);
      expect(response.body.user.userType).toBe(payload.userType);
      const resident = await prisma.resident.findFirst({
        where: {
          user: {
            cpf: payload.cpf,
          },
        },
        include: { user: { include: { resident: true } } },
      });

      expect(resident).not.toBeNull();
      expect(resident?.user.name).toBe("Bob Williams");
      expect(resident?.user.phone).toBe("11999998888");
      expect(resident?.user.resident).toBeDefined();
      expect(resident?.user.userType).toBe("RESIDENT");
    });

    it("should put an resident", async () => {
      const payload = {
        phone: "11999998885",
        name: "Bob Williams",
        userType: "RESIDENT",
      };

      const response = await request(app).put("/resident/12345678902").send(payload);

      expect(response.status).toBe(200);
      expect(response.body.user.cpf).toBe("12345678902");
      expect(response.body.user.name).toBe(payload.name);
      expect(response.body.user.userType).toBe(payload.userType);
      const resident = await prisma.resident.findFirst({
        where: {
          user: {
            cpf: "12345678902",
          },
        },
        include: { user: { include: { resident: true } } },
      });

      expect(resident).not.toBeNull();
      expect(resident?.user.name).toBe("Bob Williams");
      expect(resident?.user.phone).toBe("11999998885");
      expect(resident?.user.resident).toBeDefined();
      expect(resident?.user.userType).toBe("RESIDENT");
    });


    it("should get an resident", async () => {

      const response = await request(app).get("/resident/12345678902");

      expect(response.status).toBe(200);
      expect(response.body.user.cpf).toBe("12345678902");
      expect(response.body.user.name).toBe("Bob Williams");
      expect(response.body.user.phone).toBe("11999998885");
      expect(response.body.user.userType).toBe("RESIDENT");
      const resident = await prisma.resident.findFirst({
        where: {
          user: {
            cpf: "12345678902",
          },
        },
        include: { user: { include: { resident: true } } },
      });

      expect(resident).not.toBeNull();
      expect(resident?.user.name).toBe("Bob Williams");
      expect(resident?.user.phone).toBe("11999998885");
      expect(resident?.user.resident).toBeDefined();
      expect(resident?.user.userType).toBe("RESIDENT");
    });

  });


});
