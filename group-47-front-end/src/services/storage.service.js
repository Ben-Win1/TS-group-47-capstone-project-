import api from "./api";
export const storageService = {
  list: (projectId, params) => api.get(`/projects/${projectId}/storage`, { params }).then((r) => r.data),
  upload: (projectId, file, onUploadProgress) => {
    const body = new FormData();
    body.append("file", file);
    return api.post(`/projects/${projectId}/storage`, body, {
      headers: { "Content-Type": "multipart/form-data" },
      onUploadProgress,
    }).then((r) => r.data);
  },
  remove: (projectId, fileId) => api.delete(`/projects/${projectId}/storage/${fileId}`).then((r) => r.data),
};
