import express from "express";
import morgan from "morgan";
import dotenv from "dotenv";

dotenv.config();
import { connectToDB, db } from "./db";

import messageRouter from "./routes";

const app = express();
import { createServer } from "http";
import { Server } from "socket.io";
const httpServer = createServer(app);
export const io = new Server(httpServer, { cors: { origin: "*" } });

connectToDB();
require("./socket.ts");
app.use(morgan("dev"));
app.use(express.json());

app.use("/", (req, res) => res.send("server is running :)"));
app.use(messageRouter);

const PORT = process.env.NODE_DOCKER_PORT || 8080;
httpServer.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
