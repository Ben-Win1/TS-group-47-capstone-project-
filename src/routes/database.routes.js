import express from "express";
import {
  create,
  getAll,
  getOne,
  update,
  remove,
  query,
} from "../controllers/database.controller.js";
import authenticate from "../middleware/auth.middleware.js";
import {
  createDataValidation,
  updateDataValidation,
} from "../validations/database.validation.js";
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
  createDataValidation,
  handleValidation,
  create
);

router.get("/", getAll);

router.get("/query", query);

router.get("/:id", getOne);

router.put(
  "/:id",
  updateDataValidation,
  handleValidation,
  update
);

router.delete("/:id", remove);

export default router;