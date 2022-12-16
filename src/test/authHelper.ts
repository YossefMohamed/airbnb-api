import request from "supertest";
import { app } from "../app";

export const signin = async () => {
  let token: string;

  await request(app)
    .post("/api/users/signup")
    .send({
      name: "yossef",
      lastName: "mohamed",
      email: "yossefaa2s@ggmail.com",
      gender: "male",
      password: "12345678",
      passwordConfirmation: "12345678",
    })
    .expect(201)
    .then((res) => (token = res.body.data.user.token));
  return token!;
};

export const getUserId = async () => {
  let userID: string;

  await request(app)
    .get("/api/users/all")
    .expect(200)
    .then((res) => (userID = res.body.data[0]._id));
  return userID!;
};
