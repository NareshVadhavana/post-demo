import { ERROR_MESSAGES } from "./errorMessages.constant";
import { POST_STATUS } from "./post.constant";
import { SALT_ROUNDS, USER_ROLES } from "./user.constant";

const exportObject = Object.freeze({
  ERROR_MESSAGES,
  SALT_ROUNDS,
  USER_ROLES,
  POST_STATUS
})

export = exportObject;