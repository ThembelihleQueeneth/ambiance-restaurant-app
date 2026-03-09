import axios from "axios";

const BASE_URL = "http://10.192.0.139:5000";

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;