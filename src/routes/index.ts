import express from 'express';
import userRoutes from './user.route';
import postRoutes from './post.route';

const router = express.Router();

router.use("/users", userRoutes);
router.use("/posts", postRoutes);

export default router;