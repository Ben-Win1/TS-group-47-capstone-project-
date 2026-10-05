const { body, param, query } = require('express-validator');
const ROLES = require('../constants/roles');

const updateProfileValidation = [
  body('name').optional().isString().trim().notEmpty().withMessage('Name cannot be empty'),
  body('email').optional().isEmail().withMessage('Please provide a valid email address'),
];

const updateRoleValidation = [
  param('id').isMongoId().withMessage('Invalid User ID format'),
  body('role')
    .notEmpty()
    .withMessage('Role is required')
    .isIn(Object.values(ROLES))
    .withMessage(`Role must be one of: ${Object.values(ROLES).join(', ')}`),
];

const userIdParamValidation = [
  param('id').isMongoId().withMessage('Invalid User ID format'),
];

const listUsersValidation = [
  query('page').optional().isInt({ min: 1 }).toInt(),
  query('limit').optional().isInt({ min: 1, max: 100 }).toInt(),
];

module.exports = {
  updateProfileValidation,
  updateRoleValidation,
  userIdParamValidation,
  listUsersValidation,
};