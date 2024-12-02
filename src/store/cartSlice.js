import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [], 
  total: 0,
}
const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const { product, quantity } = action.payload;
      const existingItem = state.items.find(item => item.id === product.id);

      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        state.items.push({ ...product, quantity });
      }

      state.total = state.items.reduce((total, item) => total + item.price * item.quantity, 0);
    },
    removeFromCart: (state, action) => {
      const id = action.payload;
      state.items = state.items.filter(item => item.id !== id);
      
      state.total = state.items.reduce((total, item) => total + item.price * item.quantity, 0);
    },
    updateItemQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const item = state.items.find(item => item.id === id);
      if (item) {
        item.quantity = quantity;
      }
      state.total = state.items.reduce((total, item) => total + item.price * item.quantity, 0);
    },
    clearCart: (state) => {
      state.items = [];
      state.total = 0;
    },
    setCartItems: (state, action) => {
      state.items = action.payload;
      state.total = state.items.reduce((total, item) => total + item.price * item.quantity, 0);
    },
  },
});

export const { addToCart, removeFromCart, updateItemQuantity, clearCart, setCartItems } = cartSlice.actions;

export default cartSlice.reducer;
