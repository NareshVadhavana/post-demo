import { body } from "express-validator";
import { ERROR_MESSAGES } from "../constants";

export const createPostValidation = () => {
  return [
    body("title")
      .notEmpty()
      .withMessage(ERROR_MESSAGES.REQUIRED.replace(":attribute", "title")),
    body("body")
      .notEmpty()
      .withMessage(ERROR_MESSAGES.REQUIRED.replace(":attribute", "body"))
      .isLength({ max: 500 })
      .withMessage(ERROR_MESSAGES.MAX.replace(":attribute", "body").replace(":max", "500")),
    body("status")
      .notEmpty()
      .withMessage(ERROR_MESSAGES.REQUIRED.replace(":attribute", "status"))
      .isIn(["active", "inactive"])
      .withMessage(ERROR_MESSAGES.INVALID.replace(":attribute", "status")),
    body("latitude")
      .notEmpty()
      .withMessage(ERROR_MESSAGES.REQUIRED.replace(":attribute", "latitude"))
      .isNumeric()
      .withMessage(ERROR_MESSAGES.NUMERIC.replace(":attribute", "latitude")),
    body("longitude")
      .notEmpty()
      .withMessage(ERROR_MESSAGES.REQUIRED.replace(":attribute", "longitude"))
      .isNumeric()
      .withMessage(ERROR_MESSAGES.NUMERIC.replace(":attribute", "longitude")) 
  ];
}

export const updatePostValidation = () => {
  return [
    body("postId")
      .notEmpty()
      .withMessage(ERROR_MESSAGES.REQUIRED.replace(":attribute", "postId"))
      .isMongoId()
      .withMessage(ERROR_MESSAGES.INVALID.replace(":attribute", "postId")),
    body("title")
      .notEmpty()
      .withMessage(ERROR_MESSAGES.REQUIRED.replace(":attribute", "title")),
    body("body")
      .notEmpty()
      .withMessage(ERROR_MESSAGES.REQUIRED.replace(":attribute", "body"))
      .isLength({ max: 500 })
      .withMessage(ERROR_MESSAGES.MAX.replace(":attribute", "body").replace(":max", "500")),
    body("status")
      .notEmpty()
      .withMessage(ERROR_MESSAGES.REQUIRED.replace(":attribute", "status"))
      .isIn(["active", "inactive"])
      .withMessage(ERROR_MESSAGES.INVALID.replace(":attribute", "status")),
    body("latitude")
      .notEmpty()
      .withMessage(ERROR_MESSAGES.REQUIRED.replace(":attribute", "latitude"))
      .isNumeric()
      .withMessage(ERROR_MESSAGES.NUMERIC.replace(":attribute", "latitude")),
    body("longitude")
      .notEmpty()
      .withMessage(ERROR_MESSAGES.REQUIRED.replace(":attribute", "longitude"))
      .isNumeric()
      .withMessage(ERROR_MESSAGES.NUMERIC.replace(":attribute", "longitude")) 
  ];
}

export const deletePostValidation = () => {
  return [
    body("postId")
      .notEmpty()
      .withMessage(ERROR_MESSAGES.REQUIRED.replace(":attribute", "postId"))
      .isMongoId()
      .withMessage(ERROR_MESSAGES.INVALID.replace(":attribute", "postId"))
  ];
}

export const getPostByLocationValidation = () => {
  return [
    body("latitude")
      .optional()
      .isNumeric()
      .withMessage(ERROR_MESSAGES.NUMERIC.replace(":attribute", "latitude")),
    body("longitude")
      .optional()
      .isNumeric()
      .withMessage(ERROR_MESSAGES.NUMERIC.replace(":attribute", "longitude")) 
  ];
}