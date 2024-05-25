import { ValidationChain, validationResult } from "express-validator";
import { Request, Response, NextFunction } from "express";
import { errorMiddleware } from "./responseAPI.middleware";

const validate = (validations: ValidationChain[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    await Promise.all(validations.map(validation => validation.run(req)));

    const errors = validationResult(req);

    if (errors.isEmpty()) {
      return next();
    }

    return errorMiddleware(
      {
        message: errors.array()[0].msg
      },
      req,
      res,
      next
    );
  }
}

export default validate;