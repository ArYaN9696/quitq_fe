import axios from "axios";

const API_URL = "https://localhost:7275/api/Authorisation";

const axiosInstance = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  }
});

const authService = {
  login: async (role, credentials) => {
    try {
      console.log('Sending login request:', {
        url: `${role}/login`,
        credentials
      });

      const response = await axiosInstance.post(`/${role}/login`, credentials);
      
      console.log('Login response:', response);

      if (response.data.token) {
        localStorage.setItem("jwt_token", response.data.token);
        localStorage.setItem("user_role", role);
      }

      return response.data;
    } catch (error) {
      console.error('Login error:', error);
      if (error.response) {
        console.error('Error response:', error.response);
      }
      throw error.response?.data || "An error occurred during login.";
    }
  },

  register: async (role, userData) => {
    try {
      const response = await axiosInstance.post(`/${role}/register`, userData);
      
      if (!response.data) {
        throw new Error("Server did not return any data");
      }
      return response.data;
    } catch (error) {
      console.error('Registration error:', error);
      throw error.response?.data || "An error occurred during registration.";
    }
  },

  logout: () => {
    localStorage.removeItem("jwt_token");
    localStorage.removeItem("user_role");
  }
};

export default authService;