import axios from "axios";

const API_URL = "https://localhost:7275/api/Order";

export const getUserOrders = async () => {
  const token = localStorage.getItem("jwt_token");

  if (!token) {
    throw new Error("User not authenticated.");
  }

  try {
    const response = await axios.get(`${API_URL}/user`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching orders:", error.response || error.message);
    throw error.response?.data || { message: "Failed to fetch orders." };
  }
};

export const createOrder = async (orderDetails) => {
  const token = localStorage.getItem("jwt_token");

  if (!token) {
    throw new Error("User not authenticated.");
  }

  try {
    const response = await axios.post(API_URL, orderDetails, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error creating order:", error.response || error.message);
    throw error.response?.data || { message: "Failed to create order." };
  }
};

export default {
  getUserOrders,
  createOrder,
};
