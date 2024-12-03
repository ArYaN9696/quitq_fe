import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getCartItems as fetchCartItems,
  addToCart,
  updateCartItem,
  removeFromCart,
  clearCart,
} from "../services/cartService";

export const getCartItems = createAsyncThunk("cart/getCartItems", async () => {
  const response = await fetchCartItems();
  return response;
});

export const addToCartThunk = createAsyncThunk(
  "cart/addToCart",
  async (item, { dispatch }) => {
    const response = await addToCart(item);
    await dispatch(getCartItems());
    return response;
  }
);

export const updateCartItemThunk = createAsyncThunk(
  "cart/updateCartItem",
  async (item, { dispatch }) => {
    const response = await updateCartItem(item);
    await dispatch(getCartItems());
    return response;
  }
);

export const removeFromCartThunk = createAsyncThunk(
  "cart/removeFromCart",
  async (productId, { dispatch }) => {
    const response = await removeFromCart(productId);
    await dispatch(getCartItems());
    return response;
  }
);

export const clearCartThunk = createAsyncThunk(
  "cart/clearCart",
  async (_, { dispatch }) => {
    const response = await clearCart();
    dispatch(setCart({ items: [] })); 
    return response;
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartItems: [],
    total: 0,
    status: "idle",
    error: null,
  },
  reducers: {
    setCart: (state, action) => {
      const items = Array.isArray(action.payload) ? action.payload : [];
      state.cartItems = items;
      state.total = items.reduce(
        (total, item) => total + item.quantity * item.price,
        0
      );
    },
    resetError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCartItems.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getCartItems.fulfilled, (state, action) => {
        const items = Array.isArray(action.payload) ? action.payload : [];
        state.status = "succeeded";
        state.cartItems = items;
        state.total = items.reduce(
          (total, item) => total + item.quantity * item.price,
          0
        );
      })
      .addCase(getCartItems.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { resetError, setCart } = cartSlice.actions;
export default cartSlice.reducer;

