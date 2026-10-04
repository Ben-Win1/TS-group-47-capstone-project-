import api from "./api";
export const usageService = {
  overview: (projectId, params) => api.get(`/projects/${projectId}/usage`, { params }).then((r) => r.data),
  activity: (projectId, params) => api.get(`/projects/${projectId}/usage/activity`, { params }).then((r) => r.data),
};
