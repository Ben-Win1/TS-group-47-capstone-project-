import { ROLES } from "./roles.js";

export const PERMISSIONS = Object.freeze({
  CREATE_USERS: "users:create",
  VIEW_USERS: "users:read",
  UPDATE_USERS: "users:update",
  DELETE_USERS: "users:delete",
});

export const ROLE_PERMISSIONS = Object.freeze({
  [ROLES.USER]: [],
  [ROLES.ADMIN]: Object.values(PERMISSIONS),
});