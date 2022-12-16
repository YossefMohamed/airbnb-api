import request from "supertest";
import { app } from "../../../app";

it("fails when email is not existed with 400", async () => {
  await request(app)
    .post("/api/users/signin")
    .send({
      email: "",
      password: "password",
    })
    .expect(400);
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
      passwordConfirmation: "password",
    })
    .expect(201);
  await request(app)
    .post("/api/users/signin")
    .send({
      email: "test@test.com",
      password: "gweaaagweg",
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
      passwordConfirmation: "password",
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
