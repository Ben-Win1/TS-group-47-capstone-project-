const File = require('../models/File');
const storageService = require('./storage.service');
const ApiError = require('../utils/ApiError');

const uploadFile = async ({ file, projectId, userId, folder }) => {
  if (!file) {
    throw new ApiError(400, 'No file uploaded');
  }

  // Upload to Cloudinary
  const cloudResult = await storageService.uploadToCloudinary(file.buffer, folder);

  // Save metadata to database
  const fileRecord = await File.create({
    projectId,
    uploadedBy: userId || null,
    filename: cloudResult.original_filename || file.originalname,
    originalName: file.originalname,
    mimeType: file.mimetype,
    size: file.size,
    url: cloudResult.secure_url,
    publicId: cloudResult.public_id,
    folder: folder || 'general',
    resourceType: cloudResult.resource_type,
  });

  return fileRecord;
};

const getFiles = async (projectId, { page = 1, limit = 10, folder }) => {
  const query = { projectId };
  if (folder) {
    query.folder = folder;
  }

  const skip = (page - 1) * limit;

  const [files, total] = await Promise.all([
    File.find(query).sort({ createdAt: -1 }).skip(skip).limit(limit),
    File.countDocuments(query),
  ]);

  return {
    files,
    pagination: {
      total,
      page,
      limit,
      pages: Math.ceil(total / limit),
    },
  };
};

const getFileById = async (fileId, projectId) => {
  const file = await File.findOne({ _id: fileId, projectId });
  if (!file) {
    throw new ApiError(404, 'File not found');
  }
  return file;
};

const deleteFile = async (fileId, projectId) => {
  const file = await File.findOne({ _id: fileId, projectId });
  if (!file) {
    throw new ApiError(404, 'File not found');
  }

  // Delete from Cloudinary first
  await storageService.deleteFromCloudinary(file.publicId, file.resourceType);

  // Remove DB entry
  await file.deleteOne();

  return { id: fileId, message: 'File deleted successfully' };
};

module.exports = {
  uploadFile,
  getFiles,
  getFileById,
  deleteFile,
};