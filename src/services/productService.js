import api from '../utils/api'; // Import a configured Axios instance or API helper
import { jwtDecode } from 'jwt-decode';
/**
 * Fetch all products.
 * @returns {Promise} - List of all products.
 */
export const getAllProducts = async () => {
  try {
    const response = await api.get('/Product');
    return response.data; // Assuming the API returns data in the `data` field
  } catch (error) {
    console.error('Error fetching all products:', error);
    throw error;
  }
};

/**
 * Fetch a product by its ID.
 * @param {number} id - Product ID.
 * @returns {Promise} - Product details.
 */
export const getProductById = async (id) => {
  try {
    const response = await api.get(`/Product/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching product with ID ${id}:`, error);
    throw error;
  }
};

/**
 * Fetch products by seller ID.
 * @param {string} sellerId - Seller ID.
 * @returns {Promise} - List of products by the seller.
 */
export const getAllProductsBySellerId = async (sellerId) => {
  try {
    const response = await api.get(`/Product/${sellerId}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching products for seller ID ${sellerId}:`, error);
    throw error;
  }
};

/**
 * Fetch products by category ID.
 * @param {number} categoryId - Category ID.
 * @returns {Promise} - List of products in the category.
 */
export const getProductsByCategory = async (categoryId) => {
  try {
    const response = await api.get(`/Product/category/${categoryId}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching products for category ID ${categoryId}:`, error);
    throw error;
  }
};

/**
 * Create a new product.
 * @param {string} sellerId - Seller ID.
 * @param {object} product - Product details.
 * @returns {Promise} - Response after creating the product.
 */
export const createProduct = async (productData) => {
  try {
    // Send the POST request with only the product data
    const response = await api.post('/Product', productData);
    return response.data; 
  } catch (error) {
    console.error('Error creating product:', error);
    throw error.response?.data || 'An error occurred while creating the product';
  }
};

/**
 * Update an existing product.
 * @param {number} productId - Product ID.
 * @param {string} sellerId - Seller ID.
 * @param {object} product - Updated product details.
 * @returns {Promise} - Response after updating the product.
 */
export const updateProduct = async (productId, productData) => {
  try {
    const response = await api.put(`/Product/${productId}`, productData);
    return response.data;
  } catch (error) {
    console.error(`Error updating product with ID ${productId}:`, error.response?.data || error.message);
    throw new Error(error.response?.data || 'An error occurred while updating the product');
  }
};


/**
 * Delete a product.
 * @param {number} productId - Product ID.
 * @param {string} sellerId - Seller ID.
 * @returns {Promise} - Response after deleting the product.
 */
export const deleteProduct = async (productId, sellerId) => {
  try {
    const response = await api.delete(`/Product/${productId}/seller/${sellerId}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting product with ID ${productId}:`, error);
    throw error;
  }
};

/**
 * Update stock for a product.
 * @param {number} productId - Product ID.
 * @param {number} quantity - New stock quantity.
 * @returns {Promise} - Response after updating the stock.
 */
export const updateStock = async (productId, quantity) => {
  try {
    const response = await api.patch(`/Product/${productId}/stock`, { quantity });
    return response.data;
  } catch (error) {
    console.error(`Error updating stock for product ID ${productId}:`, error);
    throw error;
  }
};
