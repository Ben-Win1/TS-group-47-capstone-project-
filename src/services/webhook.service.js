const crypto = require('crypto');
const Webhook = require('../models/Webhook');
const ApiError = require('../utils/ApiError');

/**
 * Creates an HMAC signature for payload integrity check by client
 */
const generateSignature = (payload, secret) => {
  return crypto
    .createHmac('sha256', secret)
    .update(JSON.stringify(payload))
    .digest('hex');
};

const createWebhook = async (projectId, data) => {
  const webhook = await Webhook.create({
    projectId,
    url: data.url,
    events: data.events,
  });
  return webhook;
};

const getWebhooks = async (projectId, { page = 1, limit = 10 }) => {
  const skip = (page - 1) * limit;

  const [webhooks, total] = await Promise.all([
    Webhook.find({ projectId }).sort({ createdAt: -1 }).skip(skip).limit(limit),
    Webhook.countDocuments({ projectId }),
  ]);

  return {
    webhooks,
    pagination: {
      total,
      page,
      limit,
      pages: Math.ceil(total / limit),
    },
  };
};

const getWebhookById = async (webhookId, projectId) => {
  const webhook = await Webhook.findOne({ _id: webhookId, projectId });
  if (!webhook) {
    throw new ApiError(404, 'Webhook endpoint not found');
  }
  return webhook;
};

const updateWebhook = async (webhookId, projectId, updateData) => {
  const webhook = await Webhook.findOneAndUpdate(
    { _id: webhookId, projectId },
    { $set: updateData },
    { new: true, runValidators: true }
  );

  if (!webhook) {
    throw new ApiError(404, 'Webhook endpoint not found');
  }
  return webhook;
};

const deleteWebhook = async (webhookId, projectId) => {
  const webhook = await Webhook.findOneAndDelete({ _id: webhookId, projectId });
  if (!webhook) {
    throw new ApiError(404, 'Webhook endpoint not found');
  }
  return { id: webhookId, message: 'Webhook deleted successfully' };
};

/**
 * Triggers events across all registered webhooks for a project.
 * Called internally by other services (e.g., auth, storage, database).
 */
const triggerEvent = async (projectId, eventName, payload) => {
  const webhooks = await Webhook.find({
    projectId,
    events: eventName,
    isActive: true,
  });

  if (!webhooks.length) return;

  const eventPayload = {
    event: eventName,
    timestamp: new Date().toISOString(),
    data: payload,
  };

  // Dispatch webhook HTTP POST requests asynchronously
  webhooks.forEach(async (webhook) => {
    const signature = generateSignature(eventPayload, webhook.secret);

    try {
      const response = await fetch(webhook.url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-BaaS-Signature': signature,
          'X-BaaS-Event': eventName,
        },
        body: JSON.stringify(eventPayload),
      });

      if (!response.ok) {
        await Webhook.findByIdAndUpdate(webhook._id, {
          $inc: { failureCount: 1 },
        });
      } else if (webhook.failureCount > 0) {
        await Webhook.findByIdAndUpdate(webhook._id, {
          $set: { failureCount: 0 },
        });
      }
    } catch (err) {
      await Webhook.findByIdAndUpdate(webhook._id, {
        $inc: { failureCount: 1 },
      });
    }
  });
};

module.exports = {
  createWebhook,
  getWebhooks,
  getWebhookById,
  updateWebhook,
  deleteWebhook,
  triggerEvent,
};