import express from "express";
import dotenv from "dotenv";
import path from "path";
import { indexRouter } from "./routes";
import morgan from "morgan";
import { Router } from "express";
import { errorHandler } from "./middlewares/error-handler";
import { EnvVarError } from "./errors/env-secrets-error";
import { upload } from "./services/multer";
require("./services/cache");
const app = express();

dotenv.config({ path: path.join(__dirname, "../.env") });

if (!process.env.dbURI) throw new EnvVarError("MongoDB URI must be defined");

if (!process.env.PORT) throw new EnvVarError("server PORT must be defined");

const router = Router();
router.use("/api", indexRouter);
app.use(morgan("dev"));
app.use(express.json());
app.use("/static", express.static("public"));
app.use(router);
app.get("/", upload.array("image", 5), (req, res) => {
  res.send("server is running");
});

app.use(errorHandler);
export { app };
