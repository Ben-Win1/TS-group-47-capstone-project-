import { body } from "express-validator";

const createApiKeyValidation = [
  body("project")
    .notEmpty()
    .withMessage("Project ID is required"),

  body("name")
    .trim()
    .notEmpty()
    .withMessage("API key name is required"),

  body("expiresAt")
    .optional()
    .isISO8601()
    .withMessage("expiresAt must be a valid date"),
];

export {
  createApiKeyValidation,
};