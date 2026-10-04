import api from "./api";
export const configurationService = {
  get: (projectId) => api.get(`/projects/${projectId}/configuration`).then((r) => r.data),
  update: (projectId, data) => api.patch(`/projects/${projectId}/configuration`, data).then((r) => r.data),
};
