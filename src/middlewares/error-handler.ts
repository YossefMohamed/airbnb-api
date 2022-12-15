import { NextFunction, Request, Response } from "express";
import { CustomError } from "../errors/custom-error";
import { DatabaseConnectionError } from "../errors/database-connection-error";
import { RequestValidationError } from "../errors/request-validation";

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log(err);

  if (err instanceof CustomError) {
    return res.status(err.statusCode).json({
      status: "failed",
      error: err.serializeErrors(),
    });
  }
  res.status(500).send({
    errors: [{ message: "Something wen wrong" }],
  });
};
