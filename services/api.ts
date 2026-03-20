import axios from "axios";

const BASE_URL = "https://ambiance-restaurant-app.onrender.com";

console.log("API BASE URL:", BASE_URL); // remove after confirming

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 60000, // 60s to handle Render cold starts
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;