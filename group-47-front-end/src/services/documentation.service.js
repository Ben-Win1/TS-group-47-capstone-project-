import api from "./api";
export const documentationService = {
  get: (section) => api.get(`/documentation/${section || ""}`).then((r) => r.data),
  apiSchema: (projectId) => api.get(`/projects/${projectId}/documentation`).then((r) => r.data),
};
