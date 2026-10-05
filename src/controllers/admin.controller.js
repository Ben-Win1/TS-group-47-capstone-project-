const User = require('../models/User');
const Project = require('../models/Project');
const File = require('../models/File');
const asyncHandler = require('../utils/asyncHandler');
const response = require('../utils/response');
const ApiError = require('../utils/ApiError');

/**
 * Get system-wide metrics and analytics
 */
const getSystemStats = asyncHandler(async (req, res) => {
  const [totalUsers, totalProjects, totalFiles, storageUsage] = await Promise.all([
    User.countDocuments(),
    Project.countDocuments(),
    File.countDocuments(),
    File.aggregate([{ $group: { _id: null, totalBytes: { $sum: '$size' } } }]),
  ]);

  const totalBytes = storageUsage.length > 0 ? storageUsage[0].totalBytes : 0;

  return response(res, 200, 'System statistics retrieved successfully', {
    totalUsers,
    totalProjects,
    totalFiles,
    totalStorageBytes: totalBytes,
  });
});

/**
 * List all projects across all platform users
 */
const getAllProjects = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 10;
  const skip = (page - 1) * limit;

  const [projects, total] = await Promise.all([
    Project.find().populate('owner', 'name email').sort({ createdAt: -1 }).skip(skip).limit(limit),
    Project.countDocuments(),
  ]);

  return response(res, 200, 'All projects retrieved successfully', {
    projects,
    pagination: {
      total,
      page,
      limit,
      pages: Math.ceil(total / limit),
    },
  });
});

/**
 * Update project status (e.g., suspend or reactivate)
 */
const updateProjectStatus = asyncHandler(async (req, res) => {
  const { status } = req.body;
  const project = await Project.findByIdAndUpdate(
    req.params.id,
    { status },
    { new: true, runValidators: true }
  );

  if (!project) {
    throw new ApiError(404, 'Project not found');
  }

  return response(res, 200, 'Project status updated successfully', project);
});

/**
 * List all users registered on the platform
 */
const getAllUsers = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 10;
  const skip = (page - 1) * limit;

  const [users, total] = await Promise.all([
    User.find().select('-password').sort({ createdAt: -1 }).skip(skip).limit(limit),
    User.countDocuments(),
  ]);

  return response(res, 200, 'All users retrieved successfully', {
    users,
    pagination: {
      total,
      page,
      limit,
      pages: Math.ceil(total / limit),
    },
  });
});

module.exports = {
  getSystemStats,
  getAllProjects,
  updateProjectStatus,
  getAllUsers,
};