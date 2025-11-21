import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:8000", // ajuste se seu backend rodar em outra porta
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
