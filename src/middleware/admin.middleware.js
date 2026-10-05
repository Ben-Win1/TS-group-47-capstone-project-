const ApiError = require('../utils/ApiError');
const ROLES = require('../constants/roles');

const adminMiddleware = (req, res, next) => {
  if (!req.user) {
    return next(new ApiError(401, 'Authentication required'));
  }

  if (req.user.role !== ROLES.ADMIN) {
    return next(new ApiError(403, 'Access denied: Admin privileges required'));
  }

  next();
};

module.exports = adminMiddleware;