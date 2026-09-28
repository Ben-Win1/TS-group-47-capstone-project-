import User from "../model/user.js";
import { ROLES } from "../constants/roles.js";
import { hashPassword } from "../utils/hashPassword.js";

const createError = (message, statusCode) => {
  const error = new Error(message);
  error.statusCode = statusCode;
  return error;
};

const toPublicUser = (user) => ({
  id: user._id.toString(),
  name: user.name,
  email: user.email,
  role: user.role,
  createdAt: user.createdAt,
  updatedAt: user.updatedAt,
});

const escapeRegex = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

const getUserByIdOrThrow = async (id) => {
  const user = await User.findById(id).select("-password");

  if (!user) {
    throw createError("User not found", 404);
  }

  return user;
};

const getProfile = async (userId) => {
  const user = await getUserByIdOrThrow(userId);
  return toPublicUser(user);
};

const createUser = async ({ name, email, password, role = ROLES.USER }) => {
  const hashedPassword = await hashPassword(password);
  const user = await User.create({ name, email, password: hashedPassword, role });
  return toPublicUser(user);
};

const updateProfile = async (userId, updates) => {
  const profileUpdates = Object.fromEntries(
    Object.entries({ name: updates.name, email: updates.email })
      .filter(([, value]) => value !== undefined)
  );
  const user = await User.findByIdAndUpdate(userId, profileUpdates, {
    new: true,
    runValidators: true,
  }).select("-password");

  if (!user) {
    throw createError("User not found", 404);
  }

  return toPublicUser(user);
};

const listUsers = async ({ page = 1, limit = 20, search = "" } = {}) => {
  const safePage = Number(page);
  const safeLimit = Number(limit);
  const filter = search
    ? {
        $or: [
          { name: { $regex: escapeRegex(search), $options: "i" } },
          { email: { $regex: escapeRegex(search), $options: "i" } },
        ],
      }
    : {};

  const [users, total] = await Promise.all([
    User.find(filter)
      .select("-password")
      .sort({ createdAt: -1 })
      .skip((safePage - 1) * safeLimit)
      .limit(safeLimit),
    User.countDocuments(filter),
  ]);

  return {
    users: users.map(toPublicUser),
    pagination: {
      page: safePage,
      limit: safeLimit,
      total,
      pages: Math.ceil(total / safeLimit),
    },
  };
};

const getUser = async (id) => {
  const user = await getUserByIdOrThrow(id);
  return toPublicUser(user);
};

const updateUser = async (id, updates) => {
  const adminUpdates = Object.fromEntries(
    Object.entries({ name: updates.name, email: updates.email, role: updates.role })
      .filter(([, value]) => value !== undefined)
  );
  const user = await User.findByIdAndUpdate(id, adminUpdates, {
    new: true,
    runValidators: true,
  }).select("-password");

  if (!user) {
    throw createError("User not found", 404);
  }

  return toPublicUser(user);
};

const deleteUser = async (id, actingUserId) => {
  if (id === actingUserId) {
    throw createError("You cannot delete your own account through user management", 400);
  }

  const user = await User.findByIdAndDelete(id);

  if (!user) {
    throw createError("User not found", 404);
  }

  return toPublicUser(user);
};

export { createUser, getProfile, updateProfile, listUsers, getUser, updateUser, deleteUser };