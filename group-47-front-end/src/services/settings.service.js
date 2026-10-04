import api from "./api";
export const settingsService = {
  get: () => api.get("/settings").then((r) => r.data),
  update: (data) => api.patch("/settings", data).then((r) => r.data),
  project: (projectId, data) => api.patch(`/projects/${projectId}/settings`, data).then((r) => r.data),
  removeAccount: (data) => api.delete("/settings/account", { data }).then((r) => r.data),
};
