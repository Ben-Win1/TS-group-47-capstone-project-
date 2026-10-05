const express = require('express');
const fileController = require('../controllers/file.controller');
const upload = require('../middleware/upload.middleware');
const apiKeyMiddleware = require('../middleware/apiKey.middleware');
const projectMiddleware = require('../middleware/project.middleware');
const validate = require('../middleware/validation.middleware');
const {
  uploadValidation,
  fileIdParamValidation,
  listFilesValidation,
} = require('../validations/storage.validation');

const router = express.Router();

// Require Project API key context
router.use(apiKeyMiddleware, projectMiddleware);

router.post(
  '/upload',
  upload.single('file'),
  uploadValidation,
  validate,
  fileController.uploadFile
);

router.get('/', listFilesValidation, validate, fileController.getFiles);

router.get('/:id', fileIdParamValidation, validate, fileController.getFileById);

router.delete('/:id', fileIdParamValidation, validate, fileController.deleteFile);

module.exports = router;