import api from "./api";
export const databaseService = {
  collections: (projectId) => api.get(`/projects/${projectId}/database/collections`).then((r) => r.data),
  records: (projectId, collection, params) =>
    api.get(`/projects/${projectId}/database/${collection}`, { params }).then((r) => r.data),
  create: (projectId, collection, data) =>
    api.post(`/projects/${projectId}/database/${collection}`, data).then((r) => r.data),
  update: (projectId, collection, id, data) =>
    api.patch(`/projects/${projectId}/database/${collection}/${id}`, data).then((r) => r.data),
  remove: (projectId, collection, id) =>
    api.delete(`/projects/${projectId}/database/${collection}/${id}`).then((r) => r.data),
};
