import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import categoryService from '../services/categoryService.js';

export const fetchCategories = createAsyncThunk('categories/fetchCategories', async () => {
  const response = await categoryService.getCategories();
  return response;
});

export const createCategory = createAsyncThunk('categories/createCategory', async (categoryName) => {
  const response = await categoryService.createCategory(categoryName);
  return response;
});

export const createSubcategory = createAsyncThunk('categories/createSubcategory', async ({ categoryId, subcategoryName }) => {
  const response = await categoryService.createSubcategory(categoryId, subcategoryName);
  return response;
});

const categorySlice = createSlice({
  name: 'categories',
  initialState: {
    categories: [],
    subcategories: {},
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
      .addCase(fetchCategories.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.categories = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(createCategory.fulfilled, (state, action) => {
        state.categories.push(action.payload);
      })
      .addCase(createSubcategory.fulfilled, (state, action) => {
        const { categoryId, subcategoryName } = action.payload;
        if (!state.subcategories[categoryId]) {
          state.subcategories[categoryId] = [];
        }
        state.subcategories[categoryId].push(subcategoryName);
      });
  },
});

export const { resetError } = categorySlice.actions;
export default categorySlice.reducer;
