import { configureStore } from '@reduxjs/toolkit';
import categoryReducer from './categorySlice';
import orderReducer from "./orderSlice";
import reportReducer from "./reportSlice"

const store = configureStore({
  reducer: {
    categories: categoryReducer,
    orders: orderReducer,
    reports: reportReducer,
  },
});


export default store;
