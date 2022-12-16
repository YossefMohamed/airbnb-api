import request from "supertest";
import { app } from "../../../app";

it("fails when email is not existed", async () => {
  await request(app)
    .post("/api/users/signin")
    .send({
      email: "test@test.com",
      password: "password",
    })
    .expect(404);
});

it("fails when password is not correct", async () => {
  await request(app)
    .post("/api/users/signup")
    .send({
      name: "yossef",
      lastName: "mohamed",
      email: "test@test.com",
      gender: "male",
      password: "password",
    })
    .expect(201);
  await request(app)
    .post("/api/users/signin")
    .send({
      email: "test@test.com",
      password: "gwegweg",
    })
    .expect(404);
});

it("successful login with code 200", async () => {
  await request(app)
    .post("/api/users/signup")
    .send({
      name: "yossef",
      lastName: "mohamed",
      email: "test@test.com",
      gender: "male",
      password: "password",
    })
    .expect(201);
  await request(app)
    .post("/api/users/signin")
    .send({
      email: "test@test.com",
      password: "password",
    })
    .expect(200);
});
