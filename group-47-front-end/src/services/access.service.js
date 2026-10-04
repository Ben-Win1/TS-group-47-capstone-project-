import api from "./api";
export const accessService = {
  members: (projectId) => api.get(`/projects/${projectId}/members`).then((r) => r.data),
  invite: (projectId, data) => api.post(`/projects/${projectId}/members`, data).then((r) => r.data),
  update: (projectId, userId, data) => api.patch(`/projects/${projectId}/members/${userId}`, data).then((r) => r.data),
  remove: (projectId, userId) => api.delete(`/projects/${projectId}/members/${userId}`).then((r) => r.data),
};
