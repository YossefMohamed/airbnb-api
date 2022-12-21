import express from "express";
import mongoose from "mongoose";
import { connectDB } from "./db";
import { userRouter } from "./routes";

const app = express();

app.use(express.json());

connectDB();

app.use(userRouter);

app.listen(8000, () => console.log("hey"));
