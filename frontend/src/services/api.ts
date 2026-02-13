import axios from "axios";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "https://cinesystem.onrender.com",
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor para incluir token automaticamente
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
