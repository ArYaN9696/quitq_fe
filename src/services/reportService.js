import axios from 'axios';

const API_URL = 'https://localhost:7275/api/report';

const getSalesReport = async (sellerId, startDate, endDate) => {
  const response = await axios.get(`${API_URL}/sales/${sellerId}`, {
    params: {
      startDate,
      endDate,
    },
  });
  return response.data;
};

const getUserActivityReport = async (startDate, endDate) => {
  const response = await axios.get(`${API_URL}/user-activity`, {
    params: {
      startDate,
      endDate,
    },
  });
  return response.data;
};

const getInventoryReport = async () => {
  const response = await axios.get(`${API_URL}/inventory`);
  return response.data;
};

const getRevenueReport = async (startDate, endDate) => {
  const response = await axios.get(`${API_URL}/revenue`, {
    params: {
      startDate,
      endDate,
    },
  });
  return response.data;
};

export default {
  getSalesReport,
  getUserActivityReport,
  getInventoryReport,
  getRevenueReport,
};
