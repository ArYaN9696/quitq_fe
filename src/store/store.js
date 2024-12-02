import { configureStore } from "@reduxjs/toolkit";
import categoryReducer from "./categorySlice";
import orderReducer from "./orderSlice";
import reportReducer from "./reportSlice";
import cartReducer from "./cartSlice";

const store = configureStore({
  reducer: {
    categories: categoryReducer,
    orders: orderReducer,
    reports: reportReducer,
    cart: cartReducer,
  },
});

export default store;
