import express from "express";
import {
  create,
  getAll,
  getOne,
  update,
  remove,
} from "../controllers/project.controller.js";
import authenticate from "../middleware/auth.middleware.js";
import checkProjectOwnership from "../middleware/project.middleware.js";
import {
  createProjectValidation,
  updateProjectValidation,
} from "../validations/project.validation.js";
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
  createProjectValidation,
  handleValidation,
  create
);

router.get("/", getAll);

router.get(
  "/:id",
  checkProjectOwnership,
  getOne
);

router.put(
  "/:id",
  checkProjectOwnership,
  updateProjectValidation,
  handleValidation,
  update
);

router.delete(
  "/:id",
  checkProjectOwnership,
  remove
);

export default router;