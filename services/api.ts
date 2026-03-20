import axios from "axios";


const BASE_URL = "https://ambiance-restaurant-app.onrender.com";

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;