import { body } from "express-validator";

const createProjectValidation = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Project name is required"),

  body("description")
    .optional()
    .trim(),
];

const updateProjectValidation = [
  body("name")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Project name cannot be empty"),

  body("description")
    .optional()
    .trim(),

  body("status")
    .optional()
    .isIn(["active", "inactive"])
    .withMessage("Status must be active or inactive"),
];

export {
  createProjectValidation,
  updateProjectValidation,
};