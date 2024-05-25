import { NextFunction, Request, Response } from "express";
import { successMiddleware } from "../middlewares/responseAPI.middleware";
import UserModel from "../models/user.model";
import { ERROR_MESSAGES, POST_STATUS, SALT_ROUNDS, USER_ROLES } from "../constants";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import PostModel from "../models/post.model";
import { RequestUserI } from "../interfaces/user.interface";

export const UserController = {
  register: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { name, email, password } = req.body;

      // check email already exists or not
      const isEmailExists = await UserModel.findOne({ email: email.toLowerCase()});
      if (isEmailExists) {
        throw new Error(ERROR_MESSAGES.ALREDAY_EXISTS.replace(":attribute", "email"));
      }

      // password hash
      const hashPassword = await bcrypt.hashSync(password, SALT_ROUNDS);

      const user = await UserModel.create({
        name,
        email: email.toLowerCase(),
        password: hashPassword,
        role: USER_ROLES.USER
      });

      const userObj  = {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      };

      return successMiddleware(
        {
          message: "You are registered succesfully.",
          data: userObj
        },
        req,
        res  
      );
    } catch (error) {
      console.log("There was an issue into UserController:register : ", error);
      next(error);
    }
  },

  login: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, password } = req.body;

      // check email exists or not
      const isEmailExists = await UserModel.findOne({ email: email.toLowerCase()});
      if (!isEmailExists) {
        throw new Error(ERROR_MESSAGES.INCORRECT_CRED);
      }

      // password compare
      const comparePassword = await bcrypt.compareSync(password, isEmailExists.password);

      if (!comparePassword) {
        throw new Error(ERROR_MESSAGES.INCORRECT_CRED);
      }

      const userObj  = {
        _id: isEmailExists._id,
        name: isEmailExists.name,
        email: isEmailExists.email,
        role: isEmailExists.role
      };

      const JWT_SECRET = process.env.JWT_SECRET || '';
      const token = await jwt.sign(userObj, JWT_SECRET);

      return successMiddleware(
        {
          message: "You are logged in succesfully.",
          data: token
        },
        req,
        res  
      );
    } catch (error) {
      console.log("There was an issue into UserController:login : ", error);
      next(error);
    }
  },

  getDashboard: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const request = req as RequestUserI;

      const activePostsCount = await PostModel.countDocuments({
        createdBy: request.user?._id,
        status: POST_STATUS.ACTIVE
      });

      const inactivePostsCount = await PostModel.countDocuments({
        createdBy: request.user?._id,
        status: POST_STATUS.INACTIVE
      });

      return successMiddleware(
        {
          message: "Dashboard has been fetched successfully.",
          data: { activePostsCount, inactivePostsCount }
        },
        req,
        res  
      );
    } catch (error) {
      console.log("There was an issue into UserController:getDashboard : ", error);
      next(error);
    }
  },
}