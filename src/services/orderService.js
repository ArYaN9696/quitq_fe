import axios from "axios";

const API_URL = "http://localhost:7275/api/order";

const getUserOrders = async () => {
  const response = await axios.get(`${API_URL}/user`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`, // Use token-based authentication
    },
  });
  return response.data;
};

const createOrder = async (orderDetails) => {
  const response = await axios.post(API_URL, orderDetails, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return response.data;
};

export default {
  getUserOrders,
  createOrder,
};
