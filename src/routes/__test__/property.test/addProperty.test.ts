import request from "supertest";

import { app } from "../../../app";
import { signin } from "../../../test/authHelper";

describe("Home Tests", () => {
  test("test home adding with status code 201", async () => {
    const token = await signin();

    await request(app)
      .post("/api/property/")
      .set("Authorization", `Bearer ${token}`)
      .send({
        price: 99.9,
        name: "ssss",
        description: "Doe",
        type: "sell",
        propertyType: "villa",
        height: 45,
        width: 45,
        geolocation: {
          type: "Point",
          coordinates: [30.9785244, 30.0526845],
        },
      })
      .expect(201);
  });

  test("test home adding with  no name status code 201", async () => {
    const token = await signin();

    await request(app)
      .post("/api/property/")
      .set("Authorization", `Bearer ${token}`)
      .send({
        price: " 544",
        height: 500,
        width: 210,
        description: "Test Home For Rent For 4 Days Only!!",
        geolocation: {
          type: "Point",
          coordinates: [30.9785244, 30.0526845],
        },
      })
      .expect(400);
  });

  test("test home adding with  no user token status code 401", async () => {
    await request(app)
      .post("/api/property/")
      .send({
        name: "Test Home",
        price: " 544",
        height: 500,
        width: 210,
        description: "Test Home For Rent For 4 Days Only!!",
        geolocation: {
          type: "Point",
          coordinates: [30.9785244, 30.0526845],
        },
      })
      .expect(401);
  });

  test("test home adding with invalid token status code 201", async () => {
    const token = await signin();
    await request(app)
      .post("/api/property/")
      .set("Authorization", `Bearer dg.dfgdfg.f7itk-dgd`)
      .send({
        price: 99.9,
        name: "sasdadws",
        description: "Doe",
        type: "sell",
        propertyType: "villa",
        height: 45,
        width: 45,
        geolocation: {
          type: "Point",
          coordinates: [30.9785244, 30.0526845],
        },
      })
      .expect(401);
  });
});
