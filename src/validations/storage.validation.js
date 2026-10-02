const { body, param, query } = require('express-validator');

const uploadValidation = [
  body('folder')
    .optional()
    .isString()
    .trim()
    .matches(/^[a-zA-Z0-9_\-/]+$/)
    .withMessage('Folder name can only contain alphanumeric characters, hyphens, and slashes'),
];

const fileIdParamValidation = [
  param('id').isMongoId().withMessage('Invalid file ID format'),
];

const listFilesValidation = [
  query('page').optional().isInt({ min: 1 }).toInt(),
  query('limit').optional().isInt({ min: 1, max: 100 }).toInt(),
  query('folder').optional().isString().trim(),
];

module.exports = {
  uploadValidation,
  fileIdParamValidation,
  listFilesValidation,
};