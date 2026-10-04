const notificationService = require('../services/notification.service');
const asyncHandler = require('../utils/asyncHandler');
const response = require('../utils/response');

const createNotification = asyncHandler(async (req, res) => {
  const projectId = req.project._id;
  const notification = await notificationService.createNotification(projectId, req.body);
  return response(res, 201, 'Notification created successfully', notification);
});

const getNotifications = asyncHandler(async (req, res) => {
  const projectId = req.project._id;
  const userId = req.user ? req.user._id : null;
  const { page, limit, read, type } = req.query;

  const result = await notificationService.getNotifications(projectId, {
    page,
    limit,
    read,
    type,
    userId,
  });

  return response(res, 200, 'Notifications retrieved successfully', result);
});

const getNotificationById = asyncHandler(async (req, res) => {
  const projectId = req.project._id;
  const notification = await notificationService.getNotificationById(req.params.id, projectId);
  return response(res, 200, 'Notification details retrieved', notification);
});

const markAsRead = asyncHandler(async (req, res) => {
  const projectId = req.project._id;
  const notification = await notificationService.markAsRead(req.params.id, projectId);
  return response(res, 200, 'Notification marked as read', notification);
});

const markAllAsRead = asyncHandler(async (req, res) => {
  const projectId = req.project._id;
  const userId = req.user ? req.user._id : null;
  const result = await notificationService.markAllAsRead(projectId, userId);
  return response(res, 200, 'All notifications marked as read', result);
});

const deleteNotification = asyncHandler(async (req, res) => {
  const projectId = req.project._id;
  const result = await notificationService.deleteNotification(req.params.id, projectId);
  return response(res, 200, 'Notification deleted successfully', result);
});

module.exports = {
  createNotification,
  getNotifications,
  getNotificationById,
  markAsRead,
  markAllAsRead,
  deleteNotification,
};