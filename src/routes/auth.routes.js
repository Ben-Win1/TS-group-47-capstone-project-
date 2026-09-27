import express from "express";
import {
  register,
  login,
  logout,
} from "../controllers/auth.controller.js";
import {
  registerValidation,
  loginValidation,
} from "../validations/auth.validation.js";
import authenticate from "../middleware/auth.middleware.js";
import { validationResult } from "express-validator";

const router = express.Router();

const handleValidation = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array(),
    });
  }

  next();
};

router.post(
  "/register",
  registerValidation,
  handleValidation,
  register
);

router.post(
  "/login",
  loginValidation,
  handleValidation,
  login
);

router.post(
  "/logout",
  authenticate,
  logout
);

export default router;