const express = require('express');
const userController = require('../controllers/user.controller');
const authMiddleware = require('../middleware/auth.middleware');
const adminMiddleware = require('../middleware/admin.middleware');
const validate = require('../middleware/validation.middleware');
const {
  updateProfileValidation,
  updateRoleValidation,
  userIdParamValidation,
  listUsersValidation,
} = require('../validations/user.validation');

const router = express.Router();

// Require JWT Authentication for all user routes
router.use(authMiddleware);

// User Self Profile Routes
router.get('/profile', userController.getProfile);
router.patch('/profile', updateProfileValidation, validate, userController.updateProfile);

// Admin Only User Management Routes
router.get('/', adminMiddleware, listUsersValidation, validate, userController.getAllUsers);

router.patch(
  '/:id/role',
  adminMiddleware,
  updateRoleValidation,
  validate,
  userController.updateRole
);

router.delete(
  '/:id',
  adminMiddleware,
  userIdParamValidation,
  validate,
  userController.deleteUser
);

module.exports = router;