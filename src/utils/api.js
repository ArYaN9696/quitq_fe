import axios from 'axios';

// Axios instance with default configurations
const api = axios.create({
  baseURL: 'https://localhost:7275/api', // Your API base URL
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add Authorization token to every request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('jwt_token'); // Get the token from localStorage
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`; // Attach token to Authorization header
  }
  return config;
});

export default api;
