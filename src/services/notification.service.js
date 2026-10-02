const Notification = require('../models/Notification');
const ApiError = require('../utils/ApiError');

const createNotification = async (projectId, data) => {
  const notification = await Notification.create({
    projectId,
    userId: data.userId || null,
    title: data.title,
    message: data.message,
    type: data.type || 'info',
    metadata: data.metadata || {},
  });
  return notification;
};

const getNotifications = async (projectId, { page = 1, limit = 10, read, type, userId }) => {
  const query = { projectId };

  if (userId) query.userId = userId;
  if (typeof read === 'boolean') query.read = read;
  if (type) query.type = type;

  const skip = (page - 1) * limit;

  const [notifications, total, unreadCount] = await Promise.all([
    Notification.find(query).sort({ createdAt: -1 }).skip(skip).limit(limit),
    Notification.countDocuments(query),
    Notification.countDocuments({ ...query, read: false }),
  ]);

  return {
    notifications,
    unreadCount,
    pagination: {
      total,
      page,
      limit,
      pages: Math.ceil(total / limit),
    },
  };
};

const getNotificationById = async (notificationId, projectId) => {
  const notification = await Notification.findOne({ _id: notificationId, projectId });
  if (!notification) {
    throw new ApiError(404, 'Notification not found');
  }
  return notification;
};

const markAsRead = async (notificationId, projectId) => {
  const notification = await Notification.findOneAndUpdate(
    { _id: notificationId, projectId },
    { $set: { read: true, readAt: new Date() } },
    { new: true }
  );

  if (!notification) {
    throw new ApiError(404, 'Notification not found');
  }
  return notification;
};

const markAllAsRead = async (projectId, userId = null) => {
  const query = { projectId, read: false };
  if (userId) query.userId = userId;

  const result = await Notification.updateMany(query, {
    $set: { read: true, readAt: new Date() },
  });

  return { modifiedCount: result.modifiedCount };
};

const deleteNotification = async (notificationId, projectId) => {
  const notification = await Notification.findOneAndDelete({ _id: notificationId, projectId });
  if (!notification) {
    throw new ApiError(404, 'Notification not found');
  }
  return { id: notificationId, message: 'Notification deleted successfully' };
};

module.exports = {
  createNotification,
  getNotifications,
  getNotificationById,
  markAsRead,
  markAllAsRead,
  deleteNotification,
};