import request from "supertest";
import { app } from "../../../app";
import { signin } from "../../../test/authHelper";

describe("edit user tests", () => {
  it("edit current user success with 200", async () => {
    const token = await signin();

    await request(app)
      .patch("/api/users/")
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "Mohamed",
        lastName: "Yossef",
      })
      .expect(200);
  });

  it("edit current user with invalid name faild with 400", async () => {
    const token = await signin();
    await request(app)
      .patch("/api/users/")
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: 12,
        lastName: "Yossef",
      })
      .expect(400);
  });
  it("edit current user with invalid name faild with 400", async () => {
    const token = await signin();
    await request(app)
      .patch("/api/users/")
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: " ",
        lastName: "Yossef",
      })
      .expect(400);
  });

  it("edit current user with invalid lastName faild with 400", async () => {
    const token = await signin();
    await request(app)
      .patch("/api/users/")
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "yossef",
        lastName: "h",
      })
      .expect(400);
  });

  it("edit current user with invalid token faild with 401", async () => {
    const token = await signin();
    await request(app)
      .patch("/api/users/")
      .set("Authorization", `Bearer invalid Text`)
      .send({
        name: "yossef",
        lastName: "hasassa",
      })
      .expect(401);
  });
});
