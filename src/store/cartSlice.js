import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getCartItems as fetchCartItems, addToCart, updateCartItem, removeFromCart, clearCart } from '../services/cartService';

export const getCartItems = createAsyncThunk('cart/getCartItems', async () => {
  const response = await fetchCartItems(); // Use the renamed version of getCartItems
  return response; // Return the cart items to be stored in Redux
});

export const addToCartThunk = createAsyncThunk('cart/addToCart', async (item) => {
  const response = await addToCart(item);
  return response; // Return the added item
});

export const updateCartItemThunk = createAsyncThunk('cart/updateCartItem', async (item) => {
  const response = await updateCartItem(item);
  return response; // Return the updated item
});

export const removeFromCartThunk = createAsyncThunk('cart/removeFromCart', async (productId) => {
  const response = await removeFromCart(productId);
  return response; // Return the updated cart after removal
});

export const clearCartThunk = createAsyncThunk('cart/clearCart', async () => {
  const response = await clearCart();
  return response; // Return the confirmation or the cleared state
});

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    cartItems: [],
    status: 'idle',
    error: null,
  },
  reducers: {
    resetError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCartItems.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getCartItems.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.cartItems = action.payload;
      })
      .addCase(getCartItems.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(addToCartThunk.fulfilled, (state, action) => {
        state.cartItems.push(action.payload); // Add the new item to the cart
      })
      .addCase(updateCartItemThunk.fulfilled, (state, action) => {
        const updatedItem = action.payload;
        const index = state.cartItems.findIndex(item => item.productId === updatedItem.productId);
        if (index !== -1) {
          state.cartItems[index] = updatedItem; // Update the existing item in the cart
        }
      })
      .addCase(removeFromCartThunk.fulfilled, (state, action) => {
        state.cartItems = state.cartItems.filter(item => item.productId !== action.payload.productId);
      })
      .addCase(clearCartThunk.fulfilled, (state) => {
        state.cartItems = []; // Clear all items
      });
  },
});

export const { resetError } = cartSlice.actions;
export default cartSlice.reducer;
