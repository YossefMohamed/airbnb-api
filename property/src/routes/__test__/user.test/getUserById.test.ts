import request from "supertest";
import { app } from "../../../app";
import { signin } from "../../../test/authHelper";

describe("get a user by ID tests", () => {
  it("get a user by ID success with 200", async () => {
    const token = await signin();
    let userID: string;

    await request(app)
      .get("/api/users/all")
      .set("Authorization", `Bearer ${token}`)
      .expect(200)
      .then((res) => (userID = res.body.data[0]._id));

    await request(app)
      .get(`/api/users/${userID!}`)
      .set("Authorization", `Bearer ${token}`)
      .expect(200);
  });

  it("get a user by ID success with invalid ID 400", async () => {
    const token = await signin();
    await request(app)
      .get(`/api/users/awdawdwaqerqweadx`)
      .set("Authorization", `Bearer ${token}`)
      .expect(400);
  });

  it("get a user by ID success with invalid Token 401", async () => {
    const token = await signin();
    await request(app)
      .get("/api/users/")
      .set("Authorization", `Bearer textXtext`)
      .expect(401);
  });
});
