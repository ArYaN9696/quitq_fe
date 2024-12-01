import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import reportService from '../services/reportService';

export const fetchSalesReport = createAsyncThunk(
  'reports/fetchSalesReport',
  async ({ sellerId, startDate, endDate }) => {
    const data = await reportService.getSalesReport(sellerId, startDate, endDate);
    return data;
  }
);

export const fetchUserActivityReport = createAsyncThunk(
  'reports/fetchUserActivityReport',
  async ({ startDate, endDate }) => {
    const data = await reportService.getUserActivityReport(startDate, endDate);
    return data;
  }
);

export const fetchInventoryReport = createAsyncThunk(
  'reports/fetchInventoryReport',
  async () => {
    const data = await reportService.getInventoryReport();
    return data;
  }
);

export const fetchRevenueReport = createAsyncThunk(
  'reports/fetchRevenueReport',
  async ({ startDate, endDate }) => {
    const data = await reportService.getRevenueReport(startDate, endDate);
    return data;
  }
);

const initialState = {
  salesReport: [],
  userActivityReport: [],
  inventoryReport: [],
  revenueReport: [],
  status: 'idle',
  error: null,
};

const reportSlice = createSlice({
  name: 'reports',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSalesReport.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchSalesReport.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.salesReport = action.payload;
      })
      .addCase(fetchSalesReport.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(fetchUserActivityReport.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUserActivityReport.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.userActivityReport = action.payload;
      })
      .addCase(fetchUserActivityReport.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(fetchInventoryReport.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchInventoryReport.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.inventoryReport = action.payload;
      })
      .addCase(fetchInventoryReport.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(fetchRevenueReport.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchRevenueReport.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.revenueReport = action.payload;
      })
      .addCase(fetchRevenueReport.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default reportSlice.reducer;
