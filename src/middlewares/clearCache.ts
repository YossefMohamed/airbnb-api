import { NextFunction, Request, Response } from "express";
import cache from "../services/cache";

export const clearCache = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  await next();

  cache.clearHash(req.user ? req.user.id : "");
  cache.clearHash("all");
  return;
};
