import { NextFunction, Request, Response } from "express";
import { successMiddleware } from "../middlewares/responseAPI.middleware";
import { RequestUserI } from "../interfaces/user.interface";
import PostModel from "../models/post.model";
import { ERROR_MESSAGES } from "../constants";
import { PostsByLocationI } from "../interfaces/post.interface";

export const PostController = {
  createPost: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const request = req as RequestUserI;
      const user = request.user;
      const { title, body, status, latitude, longitude } = req.body;

      const post = await PostModel.create({
        title,
        body,
        createdBy: user?._id,
        status,
        latitude,
        longitude
      });

      return successMiddleware(
        {
          message: "Post has been created successfully.",
          data: post
        },
        req,
        res  
      );
    } catch (error) {
      console.log("There was an issue into PostController:createPost : ", error);
      next(error);
    }
  },

  getOwnPost: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const request = req as RequestUserI;
      const user = request.user;
      
      const posts = await PostModel.find({
        createdBy: user?._id
      })

      return successMiddleware(
        {
          message: "Posts has been fetched successfully.",
          data: posts
        },
        req,
        res  
      );
    } catch (error) {
      console.log("There was an issue into PostController:getOwnPost : ", error);
      next(error);
    }
  },

  updatePost: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const request = req as RequestUserI;
      const user = request.user;
      const { postId, title, body, status, latitude, longitude } = req.body;

      // check is posts exists and belongs to user
      const isValidPost = await PostModel.findOne({
        _id: postId, createdBy: user?._id
      });

      if (!isValidPost) {
        throw new Error(ERROR_MESSAGES.INVALID.replace(":attribute", "postId"));
      }

      const post = await PostModel.findOneAndUpdate(
        { _id: postId },
        {
          title,
          body,
          createdBy: user?._id,
          status,
          latitude,
          longitude
        },
        { new: true }
      );

      return successMiddleware(
        {
          message: "Post has been updated successfully.",
          data: post
        },
        req,
        res  
      );
    } catch (error) {
      console.log("There was an issue into PostController:updatePost : ", error);
      next(error);
    }
  },

  deletePost: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const request = req as RequestUserI;
      const user = request.user;
      const { postId } = req.body;

      // check is posts exists and belongs to user
      const isValidPost = await PostModel.findOne({
        _id: postId, createdBy: user?._id
      });

      if (!isValidPost) {
        throw new Error(ERROR_MESSAGES.INVALID.replace(":attribute", "postId"));
      }

      const post = await PostModel.deleteOne({ _id: postId });

      return successMiddleware(
        {
          message: "Post has been deleted successfully.",
          data: isValidPost
        },
        req,
        res  
      );
    } catch (error) {
      console.log("There was an issue into PostController:deletePost : ", error);
      next(error);
    }
  },

  getPostsByLocation: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { latitude, longitude } = req.body;
      let query: PostsByLocationI = {};

      if (latitude) {
        query = {
          ...query,
          latitude
        }
      }

      if (longitude) {
        query = {
          ...query,
          longitude
        }
      }

      const posts = await PostModel.find(query);

      return successMiddleware(
        {
          message: "Posts has been fetched successfully.",
          data: posts
        },
        req,
        res  
      );
    } catch (error) {
      console.log("There was an issue into PostController:getPostsByLocation : ", error);
      next(error);
    }
  }
}