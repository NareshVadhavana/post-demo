import express from 'express';
import validate from '../middlewares/validate.middleware';
import { createPostValidation, deletePostValidation, updatePostValidation, getPostByLocationValidation } from '../validations/post.validation';
import { PostController } from '../controllers/post.controller';
import authMiddleware from '../middlewares/auth.middleware';

const router = express.Router();

router.post("/", authMiddleware, validate(createPostValidation()), PostController.createPost);
router.get("/", authMiddleware, PostController.getOwnPost);
router.post("/update", authMiddleware, validate(updatePostValidation()), PostController.updatePost);
router.post("/delete", authMiddleware, validate(deletePostValidation()), PostController.deletePost);
router.post("/get-posts-by-location", authMiddleware, validate(getPostByLocationValidation()), PostController.getPostsByLocation);

export default router;