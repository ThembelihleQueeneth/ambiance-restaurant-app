import axios from "axios";


const BASE_URL = process.env.EXPO_PUBLIC_API_URL || "http://10.160.250.84:5000";

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;