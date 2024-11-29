import axios from 'axios';

const API_URL = 'https://localhost:7275/api/Category';

const getCategories = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

const createCategory = async (categoryName) => {
  const response = await axios.post(API_URL, { categoryName });
  return response.data;
};

const createSubcategory = async (categoryId, subcategoryName) => {
  const response = await axios.post(`${API_URL}/${categoryId}/subcategory`, { subcategoryName });
  return response.data;
};

export default {
  getCategories,
  createCategory,
  createSubcategory,
};
