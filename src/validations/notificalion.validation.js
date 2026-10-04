const { body, param, query } = require('express-validator');

const createNotificationValidation = [
  body('title')
    .notEmpty()
    .withMessage('Title is required')
    .isString()
    .trim(),
  body('message')
    .notEmpty()
    .withMessage('Message is required')
    .isString()
    .trim(),
  body('type')
    .optional()
    .isIn(['info', 'warning', 'error', 'success'])
    .withMessage('Type must be info, warning, error, or success'),
  body('userId')
    .optional()
    .isMongoId()
    .withMessage('Invalid User ID format'),
  body('metadata')
    .optional()
    .isObject()
    .withMessage('Metadata must be an object'),
];

const notificationIdParamValidation = [
  param('id').isMongoId().withMessage('Invalid Notification ID format'),
];

const listNotificationsValidation = [
  query('page').optional().isInt({ min: 1 }).toInt(),
  query('limit').optional().isInt({ min: 1, max: 100 }).toInt(),
  query('read').optional().isBoolean().toBoolean(),
  query('type').optional().isIn(['info', 'warning', 'error', 'success']),
];

module.exports = {
  createNotificationValidation,
  notificationIdParamValidation,
  listNotificationsValidation,
};