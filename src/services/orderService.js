import axios from "axios";

const API_URL = "https://localhost:7275/api/Order";

const getUserOrders = async () => {
  const response = await axios.get(`${API_URL}/user`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`, // Use token-based authentication
    },
  });
  return response.data;
};

// services/orderService.js
export const createOrder = async (orderDetails) => {
  try {
    const response = await axios.post("https://localhost:7275/api/Order", orderDetails, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwt_token")}`,
      },
    });
    console.log("Order API Response:", response.data); // Debugging
    return response.data; // Always return the data property
  } catch (error) {
    console.error("Error creating order:", error.response || error.message);
    throw error.response?.data || { message: "Unknown error occurred" };
  }
};


export default {
  getUserOrders,
  createOrder,
};
