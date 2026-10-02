const express = require('express');
const notificationController = require('../controllers/notification.controller');
const apiKeyMiddleware = require('../middleware/apiKey.middleware');
const projectMiddleware = require('../middleware/project.middleware');
const validate = require('../middleware/validation.middleware');
const {
  createNotificationValidation,
  notificationIdParamValidation,
  listNotificationsValidation,
} = require('../validations/notification.validation');

const router = express.Router();

// Enforce API key and project scoping middleware
router.use(apiKeyMiddleware, projectMiddleware);

router.post(
  '/',
  createNotificationValidation,
  validate,
  notificationController.createNotification
);

router.get(
  '/',
  listNotificationsValidation,
  validate,
  notificationController.getNotifications
);

router.patch('/read-all', notificationController.markAllAsRead);

router.get(
  '/:id',
  notificationIdParamValidation,
  validate,
  notificationController.getNotificationById
);

router.patch(
  '/:id/read',
  notificationIdParamValidation,
  validate,
  notificationController.markAsRead
);

router.delete(
  '/:id',
  notificationIdParamValidation,
  validate,
  notificationController.deleteNotification
);

module.exports = router;