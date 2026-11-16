
import axios from "axios";

const api = axios.create({
  baseURL: "https://geocart-backend-5.onrender.com/api",
  timeout: 15000,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error(
      "GeoCart API Error:",
      error.response?.status,
      error.config?.url,
      error.response?.data || error.message
    );

    return Promise.reject(error);
  }
);

export default api;
