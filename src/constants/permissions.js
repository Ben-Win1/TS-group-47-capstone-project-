const PERMISSIONS = {
  // Project Permissions
  PROJECT_CREATE: 'project:create',
  PROJECT_READ: 'project:read',
  PROJECT_UPDATE: 'project:update',
  PROJECT_DELETE: 'project:delete',

  // Database Permissions
  DATABASE_WRITE: 'database:write',
  DATABASE_READ: 'database:read',

  // File Storage Permissions
  FILE_UPLOAD: 'file:upload',
  FILE_DELETE: 'file:delete',

  // Admin Level Permissions
  ADMIN_ACCESS: 'admin:access',
  USER_MANAGE: 'user:manage',
};

module.exports = PERMISSIONS;