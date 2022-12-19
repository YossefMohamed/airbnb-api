import { Request, Response } from "express";
import Message from "../models/messageModel";

export const postMessage = async (req: any, res: Response) => {
  const { content, property } = req.body;
  const { id } = req.params;
  const message = await Message.create({
    content,
    property,
    author: req.user,
    to: id,
  });
  res.status(200).json({
    status: "ok",
    data: message,
  });
};

export const getMessages = async (req: any, res: Response) => {
  const to = req.params.id;
  const messages = await Message.findAll({
    where: {
      author: {
        in: [to, req.user._id],
      },
      to: {
        in: [to, req.user._id],
      },
    },
  });

  res.status(202).json({
    status: "ok",
    data: messages,
  });
};
