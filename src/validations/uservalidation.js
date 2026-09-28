import { body, param, query } from "express-validator";
import { ROLES } from "../constants/roles.js";

const userProfileUpdateValidation = [
  body("name").optional().trim().notEmpty().withMessage("Name cannot be empty"),
  body("email")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Email cannot be empty")
    .isEmail()
    .withMessage("Please provide a valid email"),
  body().custom((value) => {
    if (!value || (!Object.hasOwn(value, "name") && !Object.hasOwn(value, "email"))) {
      throw new Error("Provide a name or email to update");
    }

    return true;
  }),
];

const adminUserCreateValidation = [
  body("name").trim().notEmpty().withMessage("Name is required"),
  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Please provide a valid email"),
  body("password")
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
  body("role")
    .optional()
    .isIn(Object.values(ROLES))
    .withMessage("Role must be user or admin"),
];

const adminUserUpdateValidation = [
  body("name").optional().trim().notEmpty().withMessage("Name cannot be empty"),
  body("email")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Email cannot be empty")
    .isEmail()
    .withMessage("Please provide a valid email"),
  body("role")
    .optional()
    .isIn(Object.values(ROLES))
    .withMessage("Role must be user or admin"),
  body().custom((value) => {
    if (!value || !["name", "email", "role"].some((field) => Object.hasOwn(value, field))) {
      throw new Error("Provide a name, email, or role to update");
    }

    return true;
  }),
];

const userIdValidation = [
  param("id").isMongoId().withMessage("A valid user ID is required"),
];

const userListValidation = [
  query("page").optional().isInt({ min: 1 }).withMessage("Page must be a positive integer"),
  query("limit")
    .optional()
    .isInt({ min: 1, max: 100 })
    .withMessage("Limit must be between 1 and 100"),
  query("search").optional().trim(),
];

export {
  adminUserCreateValidation,
  userProfileUpdateValidation,
  adminUserUpdateValidation,
  userIdValidation,
  userListValidation,
};