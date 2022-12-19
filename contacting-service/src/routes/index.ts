import { Request, Response, Router } from "express";
import Message from "../models/messageModel";

const messageRouter = Router();
import { getMessages, postMessage } from "../controllers/messageControllers";

messageRouter.post("/:id", postMessage);
messageRouter.get("/:id", getMessages);
export default messageRouter;
