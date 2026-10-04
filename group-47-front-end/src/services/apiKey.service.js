import api from "./api";
export const apiKeyService = {
  list: (projectId) => api.get(`/projects/${projectId}/api-keys`).then((r) => r.data),
  generate: (projectId, data) => api.post(`/projects/${projectId}/api-keys`, data).then((r) => r.data),
  revoke: (projectId, keyId) => api.delete(`/projects/${projectId}/api-keys/${keyId}`).then((r) => r.data),
};
