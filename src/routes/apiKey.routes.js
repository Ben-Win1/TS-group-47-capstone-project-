import express from "express";
import {
  create,
  getAll,
  revoke,
} from "../controllers/apiKey.controller.js";
import authenticate from "../middleware/auth.middleware.js";
import {
  createApiKeyValidation,
} from "../validations/apiKey.validation.js";
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

router.use(authenticate);

router.post(
  "/",
  createApiKeyValidation,
  handleValidation,
  create
);

router.get("/", getAll);

router.patch("/:id/revoke", revoke);

export default router;