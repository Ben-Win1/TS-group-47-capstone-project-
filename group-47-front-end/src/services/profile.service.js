import api from "./api";
export const profileService = {
  get: () => api.get("/users/me").then((r) => r.data),
  update: (data) => api.patch("/users/me", data).then((r) => r.data),
  changePassword: (data) => api.patch("/users/me/password", data).then((r) => r.data),
};
