import { Response, NextFunction } from "express";
import jwt from 'jsonwebtoken'
import UserModel from "../models/user.model";
import { RequestUserI } from "../interfaces/user.interface";

const auth = async (req: RequestUserI, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      throw new Error("You have not rights to perform this action. Please login...");
    }

    const token = authHeader.replace("Bearer ", "");

    const JWT_SECRET = process.env.JWT_SECRET || '';
    const decode: any = await jwt.verify(token, JWT_SECRET);

    if (!decode || !decode._id) {
      throw new Error("You have not rights to perform this action. Please login...");
    }

    const userId = decode._id;

    // check user exists or not
    const user = await UserModel.findOne({
      _id: userId
    });

    if (!user) {
      throw new Error("You have not rights to perform this action. Please login...");
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(403);
    next(error);
  }
}

export default auth;