const express = require('express');
const webhookController = require('../controllers/webhook.controller');
const apiKeyMiddleware = require('../middleware/apiKey.middleware');
const projectMiddleware = require('../middleware/project.middleware');
const validate = require('../middleware/validation.middleware');
const {
  createWebhookValidation,
  updateWebhookValidation,
  webhookIdParamValidation,
  listWebhooksValidation,
} = require('../validations/webhook.validation');

const router = express.Router();

// Require API Key / Project context
router.use(apiKeyMiddleware, projectMiddleware);

router.post(
  '/',
  createWebhookValidation,
  validate,
  webhookController.createWebhook
);

router.get(
  '/',
  listWebhooksValidation,
  validate,
  webhookController.getWebhooks
);

router.get(
  '/:id',
  webhookIdParamValidation,
  validate,
  webhookController.getWebhookById
);

router.patch(
  '/:id',
  updateWebhookValidation,
  validate,
  webhookController.updateWebhook
);

router.delete(
  '/:id',
  webhookIdParamValidation,
  validate,
  webhookController.deleteWebhook
);

module.exports = router;