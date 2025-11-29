import request from "supertest";
import app from "../src/app"; // seu Express
import prisma from "../src/prisma";
import { resetDatabase } from "../src/prisma";
describe("Employee Integration Tests", () => {
  afterAll(async () => {
    await resetDatabase();
  });

  describe("CRUD", () => {

    const ids: number[] = [];

    it("should create an lot", async () => {
        const payload = {
            intercom: "A123",
        }
        const response = await request(app)
            .post("/lot")
            .send(payload)
            .expect(201);
        
        expect(response.body).toHaveProperty("id");
        expect(response.body.intercom).toBe(payload.intercom);
        ids.push(response.body.id);
    });

    it("should put an lot", async () => {
        const payload = {
            intercom: "A124",
        }

        const response = await request(app)
            .put(`/lot/${ids[0]}`)
            .send(payload)
            .expect(200);


        expect(response.body).toHaveProperty("id");
        expect(response.body.intercom).toBe(payload.intercom);
    });


    it("should get an lot", async () => {

        const response = await request(app)
            .get(`/lot/${ids[0]}`)
            .expect(200);


        expect(response.body).toHaveProperty("id");
        expect(response.body.intercom).toBe("A124");
    });

    it("should get many an lot's", async () => {

        const response = await request(app)
            .get(`/lot`)
            .expect(200);

        expect(Array.isArray(response.body)).toBe(true);
        expect(response.body.length).toBeGreaterThan(0);
    });

    it("should delte an lot", async () => {

        const response = await request(app)
            .delete(`/lot/${ids[0]}`)
            .expect(201);


    });
  })

});