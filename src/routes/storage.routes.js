const express = require('express');
const storageController = require('../controllers/storage.controller');
const apiKeyMiddleware = require('../middleware/apiKey.middleware');
const projectMiddleware = require('../middleware/project.middleware');

const router = express.Router();

// All routes require API key / Project scope validation
router.use(apiKeyMiddleware, projectMiddleware);

router.get('/stats', storageController.getStorageStats);

module.exports = router;