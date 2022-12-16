import request from "supertest";

import { app } from "../../../app";

test("testing for user signup returns a 201 on successful", async () => {
  await request(app)
    .post("/api/users/signup")
    .send({
      name: "yossef",
      lastName: "mohamed",
      email: "test@test.com",
      gender: "male",
      password: "12345678",
    })
    .expect(201);
});

test("testing for invaled user email on signup returns a 400 on unsuccessful", async () => {
  return request(app)
    .post("/api/users/signup")
    .send({
      name: "test",
      lastName: "test",
      email: "invalid email",
      gender: "male",
      password: "123456781",
    })
    .expect(400);
});

test("testing for invaled user password length on signup returns a 400 on unsuccessful", async () => {
  return request(app)
    .post("/api/users/signup")
    .send({
      name: "test",
      lastName: "test",
      email: "invalid email",
      gender: "male",
      password: "12",
    })
    .expect(400);
});

test("testing for invaled gender on signup returns a 400 on unsuccessful", async () => {
  return request(app)
    .post("/api/users/signup")
    .send({
      name: "test",
      lastName: "test",
      email: "invalid email",
      gender: "male",
      password: "121212121212",
    })
    .expect(400);
});

test("testing for no data sent on signup returns a 400 on unsuccessful", async () => {
  return request(app).post("/api/users/signup").send({}).expect(400);
});

test("testing for no email or password sent on signup returns a 400 on unsuccessful", async () => {
  return request(app)
    .post("/api/users/signup")
    .send({
      name: "test",
      lastName: "test",
      email: "invalid email",
      gender: "male",
    })
    .expect(400);
});

test("disallows duplicate emails", async () => {
  await request(app)
    .post("/api/users/signup")
    .send({
      name: "test",
      lastName: "test",
      email: "test@test.com",
      password: "12345678",
      gender: "male",
    })
    .expect(201);

  await request(app)
    .post("/api/users/signup")
    .send({
      name: "test",
      lastName: "test",
      email: "test@test.com",
      password: "12345678",
      gender: "male",
    })
    .expect(400);
});
