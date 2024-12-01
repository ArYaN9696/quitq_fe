import { configureStore } from '@reduxjs/toolkit';
import categoryReducer from './categorySlice';
import orderReducer from "./orderSlice";

const store = configureStore({
  reducer: {
    categories: categoryReducer,
    orders: orderReducer,
  },
});


export default store;
