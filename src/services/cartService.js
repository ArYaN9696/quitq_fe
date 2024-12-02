import api from '../utils/api';

// Fetch Cart Items
export const getCartItems = async () => {
  try {
    const response = await api.get('/cart');
    return response.data; // Returns the list of cart items
  } catch (error) {
    console.error('Error fetching cart items:', error);
    throw new Error('Failed to fetch cart items.');
  }
};

// Add Item to Cart
export const addToCart = async (item) => {
  try {
    const response = await api.post('/cart', item);  // Send the item to the server
    return response.data; // Returns the newly added item in the cart
  } catch (error) {
    console.error('Error adding to cart:', error);
    throw new Error('Failed to add item to cart.');
  }
};

// Update Cart Item
export const updateCartItem = async (item) => {
  try {
    const response = await api.put('/cart', item); // Update the cart item on the server
    return response.data; // Returns the updated cart item
  } catch (error) {
    console.error('Error updating cart item:', error);
    throw new Error('Failed to update cart item.');
  }
};

// Remove Item from Cart
export const removeFromCart = async (productId) => {
  try {
    const response = await api.delete(`/cart/${productId}`); // Remove item by its ID
    return response.data; // Returns the confirmation or the updated cart items
  } catch (error) {
    console.error('Error removing item from cart:', error);
    throw new Error('Failed to remove item from cart.');
  }
};

// Clear Cart
export const clearCart = async () => {
  try {
    const response = await api.delete('/cart'); // Clear the entire cart
    return response.data; // Returns the confirmation of cart clearance
  } catch (error) {
    console.error('Error clearing cart:', error);
    throw new Error('Failed to clear cart.');
  }
};
