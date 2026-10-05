const userService = require('../services/user.service');
const asyncHandler = require('../utils/asyncHandler');
const response = require('../utils/response');

const getProfile = asyncHandler(async (req, res) => {
  const user = await userService.getUserProfile(req.user._id);
  return response(res, 200, 'Profile retrieved successfully', user);
});

const updateProfile = asyncHandler(async (req, res) => {
  const user = await userService.updateUserProfile(req.user._id, req.body);
  return response(res, 200, 'Profile updated successfully', user);
});

const getAllUsers = asyncHandler(async (req, res) => {
  const { page, limit } = req.query;
  const result = await userService.getAllUsers({ page, limit });
  return response(res, 200, 'Users retrieved successfully', result);
});

const updateUserRole = asyncHandler(async (req, res) => {
  const { role } = req.body;
  const user = await userService.updateUserRole(req.params.id, role);
  return response(res, 200, 'User role updated successfully', user);
});

const deleteUser = asyncHandler(async (req, res) => {
  const result = await userService.deleteUser(req.params.id);
  return response(res, 200, 'User deleted successfully', result);
});

module.exports = {
  getProfile,
  updateProfile,
  getAllUsers,
  updateUserRole,
  deleteUser,
};