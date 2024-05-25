import { NextFunction, Request, Response } from "express";

interface SuccessResponseI {
  message?: string;
  status?: number;
  data?: any
}

export const successMiddleware = (success: SuccessResponseI, req: Request, res: Response) => {
  const statusCode = success.status || 200;
  const message = success.message || 'Successfull.';
  const data = success.data || null;

  res.status(statusCode).send({
    message: message,
    success: true,
    statusCode: statusCode,
    data: data
  });
}

interface ErrorResponseI {
  message?: string;
  status?: number;
}

export const errorMiddleware = (error: ErrorResponseI, req: Request, res: Response, next: NextFunction) => {
  const statusCode = error.status || 400;
  const message = error.message || 'There was an issue into server.';

  res.status(statusCode).send({
    message: message,
    success: false,
    statusCode: statusCode
  });
}