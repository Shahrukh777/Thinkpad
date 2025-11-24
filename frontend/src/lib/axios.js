import axios from "axios";

const BASE_URL =
  import.meta.env.DEV
    ? "http://localhost:3000/api"
    : `https://thinkpad-38lg.onrender.com/api`;

const api = axios.create({
  baseURL: BASE_URL,
});

export default api;
