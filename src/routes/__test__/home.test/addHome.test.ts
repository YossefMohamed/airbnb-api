import request from "supertest";

import { app } from "../../../app";
import { signin } from "../../../test/authHelper";

describe("Home Tests", () => {
  test("test home adding with status code 201", async () => {
    const token = await signin();

    await request(app)
      .post("/api/homes/")
      .set("Authorization", `Bearer ${token}`)
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
      .expect(201);
  });

  test("test home adding with  no name status code 201", async () => {
    const token = await signin();

    await request(app)
      .post("/api/homes/")
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
      .post("/api/homes/")
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
      .post("/api/homes/")
      .set(
        "Authorization",
        `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IawWVCJ9.eyJpZCI6IjYzOGNjNDIzN2E1Y2M1YjJmZDJkMjhjMCIsImlhdCI6MTY3MDE2OTk0OSwiZXhwIjoxNjcyNzYxOTQ5fQ.f7itk-8iORK03TBrm0mBvjcVk_ixXScGS1iu5FOCv9o`
      )
      .send({
        price: " 544",
        description: "Test Home For Rent For 4 Days Only!!",
        geolocation: {
          type: "Point",
          coordinates: [30.9785244, 30.0526845],
        },
      })
      .expect(500);
  });
});
