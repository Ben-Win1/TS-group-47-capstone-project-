import {
  createUser,
  getProfile,
  updateProfile,
  listUsers,
  getUser,
  updateUser,
  deleteUser,
} from "../services/user.service.js";

const sendError = (res, error) => {
  const statusCode = error.statusCode || (error.code === 11000 ? 409 : 500);
  const message = error.code === 11000
    ? "A user with this email already exists"
    : statusCode === 500
      ? "An unexpected error occurred"
      : error.message;

  return res.status(statusCode).json({ success: false, message });
};

const readProfile = async (req, res) => {
  try {
    const user = await getProfile(req.user.userId);
    return res.status(200).json({ success: true, data: user });
  } catch (error) {
    return sendError(res, error);
  }
};

const addUser = async (req, res) => {
  try {
    const user = await createUser(req.body);
    return res.status(201).json({ success: true, data: user });
  } catch (error) {
    return sendError(res, error);
  }
};

const editProfile = async (req, res) => {
  try {
    const user = await updateProfile(req.user.userId, req.body);
    return res.status(200).json({ success: true, data: user });
  } catch (error) {
    return sendError(res, error);
  }
};

const readUsers = async (req, res) => {
  try {
    const result = await listUsers(req.query);
    return res.status(200).json({ success: true, data: result });
  } catch (error) {
    return sendError(res, error);
  }
};

const readUser = async (req, res) => {
  try {
    const user = await getUser(req.params.id);
    return res.status(200).json({ success: true, data: user });
  } catch (error) {
    return sendError(res, error);
  }
};

const editUser = async (req, res) => {
  try {
    const user = await updateUser(req.params.id, req.body);
    return res.status(200).json({ success: true, data: user });
  } catch (error) {
    return sendError(res, error);
  }
};

const removeUser = async (req, res) => {
  try {
    const user = await deleteUser(req.params.id, req.user.userId);
    return res.status(200).json({ success: true, data: user });
  } catch (error) {
    return sendError(res, error);
  }
};

export { addUser, readProfile, editProfile, readUsers, readUser, editUser, removeUser };