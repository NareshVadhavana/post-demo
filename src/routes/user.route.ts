import express from 'express';
import { UserController } from '../controllers/user.controller';
import { loginValidation, registerValidation } from '../validations/user.validation';
import validate from '../middlewares/validate.middleware';
import authMiddleware from '../middlewares/auth.middleware';

const router = express.Router();

router.post("/register", validate(registerValidation()), UserController.register);
router.post("/login", validate(loginValidation()), UserController.login);
router.post("/dashboard", authMiddleware, UserController.getDashboard);

export default router;