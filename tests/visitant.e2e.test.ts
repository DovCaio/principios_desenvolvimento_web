import request from "supertest";
import app from "../src/app";
import prisma from "../src/prisma";
import { resetDatabase } from "../src/prisma";

describe("Employee Integration Tests", () => {
  afterAll(async () => {
    await resetDatabase();
  });

  describe("CRUD", () => {
    it("should create an visitor with linked user", async () => {
      const payload = {
        cpf: "00044433321",
        phone: "11988887777",
        name: "Nolan Smith",
        password: "SENHAFROtissima112421!",
        userType: "VISITOR",
      };

      const response = await request(app).post("/visitor").send(payload);

      expect(response.status).toBe(201);
      expect(response.body.user.cpf).toBe(payload.cpf);
      expect(response.body.user.userType).toBe(payload.userType);
      expect(response.body.user.name).toBe(payload.name);
      expect(response.body.user.phone).toBe(payload.phone);

      const visitor = await prisma.visitor.findFirst({
        where: {
          user: {
            cpf: payload.cpf,
          },
        },
        include: { user: true },
      });

      expect(visitor).not.toBeNull();
      expect(visitor?.user.name).toBe(payload.name);
      expect(visitor?.user.userType).toBe("VISITOR");
    });

    it("should update an visitor with linked user", async () => {
      const payload = {
        phone: "11988885125",
        name: "Galand Smith",
      };

      const cpfToUpdate = "00044433321";

      const response = await request(app)
        .put(`/visitor/${cpfToUpdate}`)
        .send(payload);

      expect(response.status).toBe(200);
      expect(response.body.user.cpf).toBe(cpfToUpdate);
      expect(response.body.user.name).toBe(payload.name);
      expect(response.body.user.phone).toBe(payload.phone);

      const visitor = await prisma.visitor.findFirst({
        where: {
          user: {
            cpf: cpfToUpdate,
          },
        },
        include: { user: true },
      });

      expect(visitor).not.toBeNull();
      expect(visitor?.user.name).toBe(payload.name);
      expect(visitor?.user.phone).toBe(payload.phone);
      expect(visitor?.user.userType).toBe("VISITOR");
    });

    it("should get an visitor with linked user", async () => {
      const cpfToGet = "00044433321";

      const response = await request(app).get(`/visitor/${cpfToGet}`);

      expect(response.status).toBe(200);
      expect(response.body.user.cpf).toBe(cpfToGet);
      expect(response.body.user.name).toBe("Galand Smith");
      expect(response.body.user.phone).toBe("11988885125");

      const visitor = await prisma.visitor.findFirst({
        where: {
          user: {
            cpf: cpfToGet,
          },
        },
        include: { user: true },
      });

      expect(visitor).not.toBeNull();
      expect(visitor?.user.name).toBe("Galand Smith");
      expect(visitor?.user.phone).toBe("11988885125");
      expect(visitor?.user.userType).toBe("VISITOR");
    });

    it("should get all the visitor's with linked user", async () => {
      const response = await request(app).get(`/visitor/`);

      expect(response.status).toBe(200);

      expect(response.body.length).toBeGreaterThan(0);
      const visitor = await prisma.visitor.findMany({
        include: { user: true },
      });

      expect(visitor).not.toBeNull();
      expect(visitor.length).toBeGreaterThan(0);
    });

    it("should delete the visitor with linked user", async () => {
      const cpfToDelete = "00044433321";

      const response = await request(app).delete(`/visitor/${cpfToDelete}`);

      expect(response.status).toBe(204);

      const visitor = await prisma.visitor.findFirst({
        where: {
          userCpf: cpfToDelete,
        },
        include: { user: true },
      });

      expect(visitor).toBeNull();
    });
  });

  describe("Entry Record", () => {
    const visitatsId : number[] = [];

    let jwt: string;

    it("should create an entry record for a visitor", async () => {
      const payload = {
        cpf: "00044433321",
        phone: "11988887777",
        name: "Nolan Smith",
        password: "SENHAFROtissima112421!",
        userType: "VISITOR",
      };

      const visitorResponse = await request(app).post("/visitor").send(payload);
      const visitantId = visitorResponse.body.id;
      visitatsId.push(visitantId);


        const loginResponse = await request(app).post("/auth/login").send({
          cpf: payload.cpf,
          password: payload.password,
        });

        jwt = loginResponse.body.token;

      const entryRecordPayload = {
        visitantId,
        type: "ENTRY",
      };

      const response = await request(app)
        .post("/visitor/entry-record")
        .set("Authorization", `Bearer ${jwt}`)
        .send(entryRecordPayload);

      expect(response.status).toBe(200);

      const entryRecords = await prisma.entryRecord.findMany({
        where: {
          visitorId: visitantId,
        },
      });

      expect(entryRecords.length).toBeGreaterThan(0);
      expect(entryRecords[0].type).toBe("ENTRY");
    });

    it("should create an exit record for a visitor", async () => {
      const visitantId = visitatsId[0];

      const entryRecordPayload = {
        visitantId,
        type: "EXIT",
      };

      const response = await request(app)
        .post("/visitor/entry-record")
        .set("Authorization", `Bearer ${jwt}`)
        .send(entryRecordPayload);

      expect(response.status).toBe(200);

      const entryRecords = await prisma.entryRecord.findMany({
        where: {
          visitorId: visitantId,
        },
      });

      expect(entryRecords.length).toBeGreaterThan(1);
      expect(entryRecords[1].type).toBe("EXIT");
    });
  });
});
