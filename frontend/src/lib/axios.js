import axios from "axios";

const BASE_URL =
  import.meta.env.DEV
    ? "http://localhost:3000/api"
    : `${window.location.origin}/api`;

const api = axios.create({
  baseURL: BASE_URL,
});

export default api;
