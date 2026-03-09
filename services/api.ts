import axios from 'axios';

// Replace with your local IP if testing on a physical device
const BASE_URL = 'http://192.168.1.111:5000';

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
