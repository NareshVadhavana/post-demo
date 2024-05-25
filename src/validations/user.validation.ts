import { body } from "express-validator";
import { ERROR_MESSAGES } from "../constants";

export const registerValidation = () => {
  return [
    body("name")
      .notEmpty()
      .withMessage(ERROR_MESSAGES.REQUIRED.replace(":attribute", "name")),
    body("email")
      .notEmpty()
      .withMessage(ERROR_MESSAGES.REQUIRED.replace(":attribute", "email"))
      .isEmail()
      .withMessage(ERROR_MESSAGES.INVALID.replace(":attribute", "email")),
    body("password")
      .notEmpty()
      .withMessage(ERROR_MESSAGES.REQUIRED.replace(":attribute", "password"))
      .isLength({ min: 6 })
      .withMessage(ERROR_MESSAGES.MIN.replace(":attribute", "password").replace(":min", "6")),
  ];
}

export const loginValidation = () => {
  return [
    body("email")
      .notEmpty()
      .withMessage(ERROR_MESSAGES.REQUIRED.replace(":attribute", "email"))
      .isEmail()
      .withMessage(ERROR_MESSAGES.INVALID.replace(":attribute", "email")),
    body("password")
      .notEmpty()
      .withMessage(ERROR_MESSAGES.REQUIRED.replace(":attribute", "password"))
  ];
}