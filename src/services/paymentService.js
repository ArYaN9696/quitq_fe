import api from '../utils/api';

/**
 * Process a payment.
 * @param {Object} paymentData - Payment details including orderId, paymentMethod, and amount.
 * @returns {Promise} - API response.
 */
export const processPayment = async (paymentData) => {
  try {
    const response = await api.post('/Payment', paymentData);
    return response.data;
  } catch (error) {
    console.error('Error processing payment:', error);
    throw error.response?.data || 'An error occurred while processing the payment.';
  }
};

/**
 * Validate a payment by transaction ID.
 * @param {string} transactionId - Transaction ID to validate.
 * @returns {Promise} - API response.
 */
export const validatePayment = async (transactionId) => {
  try {
    const response = await api.post(`/Payment/validate?transactionId=${transactionId}`);
    return response.data;
  } catch (error) {
    console.error('Error validating payment:', error);
    throw error.response?.data || 'An error occurred while validating the payment.';
  }
};

/**
 * Get payments for a specific order.
 * @param {number} orderId - Order ID to fetch payments.
 * @returns {Promise} - List of payments.
 */
export const getPaymentsByOrderId = async (orderId) => {
  try {
    const response = await api.get(`/Payment/${orderId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching payments:', error);
    throw error.response?.data || 'An error occurred while fetching payments.';
  }
};
