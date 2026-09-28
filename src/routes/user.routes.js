import express from "express";
import { validationResult } from "express-validator";
import authenticate from "../middleware/auth.middleware.js";
import requirePermission from "../middleware/admin.middleware.js";
import { PERMISSIONS } from "../constants/permission.js";
import {
  adminUserCreateValidation,
  userProfileUpdateValidation,
  adminUserUpdateValidation,
  userIdValidation,
  userListValidation,
} from "../validations/uservalidation.js";
import {
  addUser,
  readProfile,
  editProfile,
  readUsers,
  readUser,
  editUser,
  removeUser,
} from "../controllers/user.controller.js";

const router = express.Router();

const handleValidation = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, errors: errors.array() });
  }

  next();
};

router.get("/me", authenticate, readProfile);
router.patch(
  "/me",
  authenticate,
  userProfileUpdateValidation,
  handleValidation,
  editProfile
);

router.post(
  "/",
  authenticate,
  requirePermission(PERMISSIONS.CREATE_USERS),
  adminUserCreateValidation,
  handleValidation,
  addUser
);
router.get(
  "/",
  authenticate,
  requirePermission(PERMISSIONS.VIEW_USERS),
  userListValidation,
  handleValidation,
  readUsers
);
router.get(
  "/:id",
  authenticate,
  requirePermission(PERMISSIONS.VIEW_USERS),
  userIdValidation,
  handleValidation,
  readUser
);
router.patch(
  "/:id",
  authenticate,
  requirePermission(PERMISSIONS.UPDATE_USERS),
  userIdValidation,
  adminUserUpdateValidation,
  handleValidation,
  editUser
);
router.delete(
  "/:id",
  authenticate,
  requirePermission(PERMISSIONS.DELETE_USERS),
  userIdValidation,
  handleValidation,
  removeUser
);

export default router;