import request from "supertest";
import { app } from "../../../app";
import { signin } from "../../../test/authHelper";

describe("get current user tests", () => {
  it("get current user success with 200", async () => {
    const token = await signin();

    await request(app)
      .get("/api/users/")
      .set("Authorization", `Bearer ${token}`)
      .expect(200);
  });
  it("get current user success with invalid token 401", async () => {
    const token = await signin();
    await request(app)
      .get("/api/users/")
      .set("Authorization", `Bearer textXtext`)
      .expect(401);
  });
});
