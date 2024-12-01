import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import orderService from "../services/orderService";

const API_BASE_URL = "https://localhost:7275/api/Order";

// Async thunk to fetch order details
export const fetchOrderById = createAsyncThunk(
  "orders/fetchOrderById",
  async (orderId, thunkAPI) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/${orderId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
export const fetchUserOrders = createAsyncThunk(
  "orders/fetchUserOrders",
  async (_, { rejectWithValue }) => {
    try {
      return await orderService.getUserOrders();
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to fetch orders"
      );
    }
  }
);

export const createOrder = createAsyncThunk(
  "order/createOrder",
  async (orderDetails, { rejectWithValue }) => {
    try {
      const response = await orderService.createOrder(orderDetails);
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const orderSlice = createSlice({
  name: "orders",
  initialState: {
    orderDetails: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrderById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOrderById.fulfilled, (state, action) => {
        state.loading = false;
        state.orderDetails = action.payload;
      })
      .addCase(fetchOrderById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchUserOrders.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchUserOrders.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.orders = action.payload;
      })
      .addCase(fetchUserOrders.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(createOrder.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.orders.push(action.payload);
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default orderSlice.reducer;
