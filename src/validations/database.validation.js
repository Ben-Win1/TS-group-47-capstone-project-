import { body } from "express-validator";

const createDataValidation = [
  body("project")
    .notEmpty()
    .withMessage("Project ID is required"),

  body("collection")
    .trim()
    .notEmpty()
    .withMessage("Collection name is required"),

  body("data")
    .notEmpty()
    .withMessage("Data is required"),
];

const updateDataValidation = [
  body("collection")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Collection name cannot be empty"),

  body("data")
    .optional()
    .notEmpty()
    .withMessage("Data cannot be empty"),
];

export {
  createDataValidation,
  updateDataValidation,
};