import request from "supertest";
import { app } from "../../../app";
import { signin } from "../../../test/authHelper";

describe("get all user tests", () => {
  it("get all users success with 200", async () => {
    const token = await signin();

    await request(app)
      .get("/api/users/all")
      .set("Authorization", `Bearer ${token}`)
      .expect(200);
  });
  //   it("get all users success with invalid token 401", async () => {
  //     const token = await signin();

  //     await request(app)
  //       .get("/api/users/all")
  //       .set("Authorization", `Bearer textXtext`)
  //       .expect(401);
  //   });
});
