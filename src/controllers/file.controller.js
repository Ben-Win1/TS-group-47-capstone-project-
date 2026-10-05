const fileService = require('../services/file.service');
const asyncHandler = require('../utils/asyncHandler');
const response = require('../utils/response');

const uploadFile = asyncHandler(async (req, res) => {
  const projectId = req.project._id;
  const userId = req.user ? req.user._id : null;
  const folder = req.body.folder || 'general';

  const fileData = await fileService.uploadFile({
    file: req.file,
    projectId,
    userId,
    folder,
  });

  return response(res, 201, 'File uploaded successfully', fileData);
});

const getFiles = asyncHandler(async (req, res) => {
  const projectId = req.project._id;
  const { page, limit, folder } = req.query;

  const result = await fileService.getFiles(projectId, { page, limit, folder });
  return response(res, 200, 'Files retrieved successfully', result);
});

const getFileById = asyncHandler(async (req, res) => {
  const projectId = req.project._id;
  const file = await fileService.getFileById(req.params.id, projectId);

  return response(res, 200, 'File details retrieved', file);
});

const deleteFile = asyncHandler(async (req, res) => {
  const projectId = req.project._id;
  const result = await fileService.deleteFile(req.params.id, projectId);

  return response(res, 200, 'File deleted successfully', result);
});

module.exports = {
  uploadFile,
  getFiles,
  getFileById,
  deleteFile,
};