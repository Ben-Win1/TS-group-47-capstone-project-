const webhookService = require('../services/webhook.service');
const asyncHandler = require('../utils/asyncHandler');
const response = require('../utils/response');

const createWebhook = asyncHandler(async (req, res) => {
  const projectId = req.project._id;
  const webhook = await webhookService.createWebhook(projectId, req.body);
  return response(res, 201, 'Webhook registered successfully', webhook);
});

const getWebhooks = asyncHandler(async (req, res) => {
  const projectId = req.project._id;
  const { page, limit } = req.query;
  const result = await webhookService.getWebhooks(projectId, { page, limit });
  return response(res, 200, 'Webhooks retrieved successfully', result);
});

const getWebhookById = asyncHandler(async (req, res) => {
  const projectId = req.project._id;
  const webhook = await webhookService.getWebhookById(req.params.id, projectId);
  return response(res, 200, 'Webhook details retrieved', webhook);
});

const updateWebhook = asyncHandler(async (req, res) => {
  const projectId = req.project._id;
  const webhook = await webhookService.updateWebhook(
    req.params.id,
    projectId,
    req.body
  );
  return response(res, 200, 'Webhook updated successfully', webhook);
});

const deleteWebhook = asyncHandler(async (req, res) => {
  const projectId = req.project._id;
  const result = await webhookService.deleteWebhook(req.params.id, projectId);
  return response(res, 200, 'Webhook deleted successfully', result);
});

module.exports = {
  createWebhook,
  getWebhooks,
  getWebhookById,
  updateWebhook,
  deleteWebhook,
};