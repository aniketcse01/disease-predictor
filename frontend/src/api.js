// src/api.js
import axios from "axios";

const BASE = import.meta.env.VITE_API_BASE ?? "/api/disease"; // works with proxy

const api = axios.create({
  baseURL: BASE,
  headers: { "Content-Type": "application/json" },
  // timeout: 10000,
});

export default api;
