import User from "../model/user.js";
import { ROLE_PERMISSIONS } from "../constants/permission.js";

const requirePermission = (permission) => async (req, res, next) => {
  try {
    const user = await User.findById(req.user?.userId).select("role");

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Authenticated user no longer exists",
      });
    }

    const permissions = ROLE_PERMISSIONS[user.role] || [];

    if (!permissions.includes(permission)) {
      return res.status(403).json({
        success: false,
        message: "You do not have permission to perform this action",
      });
    }

    req.currentUser = user;
    next();
  } catch {
    return res.status(500).json({
      success: false,
      message: "Unable to verify user permissions",
    });
  }
};

export default requirePermission;