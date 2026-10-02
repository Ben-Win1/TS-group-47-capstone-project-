const { body, param, query } = require('express-validator');

const createWebhookValidation = [
  body('url')
    .notEmpty()
    .withMessage('Webhook URL is required')
    .isURL({ protocols: ['http', 'https'], require_protocol: true })
    .withMessage('URL must be a valid HTTP or HTTPS address'),
  body('events')
    .isArray({ min: 1 })
    .withMessage('At least one event type must be specified'),
  body('events.*')
    .isString()
    .trim()
    .notEmpty()
    .withMessage('Event names must be non-empty strings'),
];

const updateWebhookValidation = [
  param('id').isMongoId().withMessage('Invalid Webhook ID'),
  body('url')
    .optional()
    .isURL({ protocols: ['http', 'https'], require_protocol: true })
    .withMessage('URL must be a valid HTTP or HTTPS address'),
  body('events')
    .optional()
    .isArray({ min: 1 })
    .withMessage('Events must be an array with at least one item'),
  body('events.*').optional().isString().trim(),
  body('isActive')
    .optional()
    .isBoolean()
    .withMessage('isActive must be a boolean value'),
];

const webhookIdParamValidation = [
  param('id').isMongoId().withMessage('Invalid Webhook ID'),
];

const listWebhooksValidation = [
  query('page').optional().isInt({ min: 1 }).toInt(),
  query('limit').optional().isInt({ min: 1, max: 100 }).toInt(),
];

module.exports = {
  createWebhookValidation,
  updateWebhookValidation,
  webhookIdParamValidation,
  listWebhooksValidation,
};