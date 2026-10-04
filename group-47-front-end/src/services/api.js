import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "/api",
  headers: { "Content-Type": "application/json" },
  timeout: 15000,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("nexusbase_token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;
    if (status === 401) {
      localStorage.removeItem("nexusbase_token");
      localStorage.removeItem("nexusbase_user");
      if (!window.location.pathname.startsWith("/login")) window.location.assign("/login");
    }
    const messages = {
      400: "Please check the information you entered.",
      403: "You do not have permission to perform this action.",
      404: "The requested resource could not be found.",
      409: "This resource conflicts with an existing resource.",
      500: "The server encountered an error. Please try again.",
    };
    error.friendlyMessage =
      error.response?.data?.message || messages[status] || "Unable to reach the server. Check your connection.";
    return Promise.reject(error);
  },
);

export default api;
