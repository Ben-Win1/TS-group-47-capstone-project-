const User = require('../models/User');
const ApiError = require('../utils/ApiError');

const getUserProfile = async (userId) => {
  const user = await User.findById(userId).select('-password');
  if (!user) {
    throw new ApiError(404, 'User profile not found');
  }
  return user;
};

const updateUserProfile = async (userId, updateData) => {
  // Prevent users from changing their own role via profile update
  delete updateData.role;

  const user = await User.findByIdAndUpdate(
    userId,
    { $set: updateData },
    { new: true, runValidators: true }
  ).select('-password');

  if (!user) {
    throw new ApiError(404, 'User not found');
  }
  return user;
};

const getAllUsers = async ({ page = 1, limit = 10 }) => {
  const skip = (page - 1) * limit;

  const [users, total] = await Promise.all([
    User.find().select('-password').sort({ createdAt: -1 }).skip(skip).limit(limit),
    User.countDocuments(),
  ]);

  return {
    users,
    pagination: {
      total,
      page,
      limit,
      pages: Math.ceil(total / limit),
    },
  };
};

const updateUserRole = async (targetUserId, newRole) => {
  const user = await User.findByIdAndUpdate(
    targetUserId,
    { $set: { role: newRole } },
    { new: true, runValidators: true }
  ).select('-password');

  if (!user) {
    throw new ApiError(404, 'User not found');
  }
  return user;
};

const deleteUser = async (targetUserId) => {
  const user = await User.findByIdAndDelete(targetUserId);
  if (!user) {
    throw new ApiError(404, 'User not found');
  }
  return { id: targetUserId, message: 'User deleted successfully' };
};

module.exports = {
  getUserProfile,
  updateUserProfile,
  getAllUsers,
  updateUserRole,
  deleteUser,
};