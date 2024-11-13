// src/redux/contentSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'https://hn.algolia.com/api/v1/search';

export const fetchContent = createAsyncThunk(
  'content/fetchContent',
  async ({ query = '', page = 0, filters = {} }) => {
    const params = new URLSearchParams({
      query: query,
      page: page.toString(),
      ...filters
    });
    const response = await axios.get(`${API_URL}?${params.toString()}`);
    return response.data;
  }
);

const contentSlice = createSlice({
  name: 'content',
  initialState: {
    items: [],
    query: '',
    status: 'idle',
    currentPage: 0,
    totalPages: 0,
    totalHits: 0
  },
  reducers: {
    setQuery: (state, action) => {
      state.query = action.payload;
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchContent.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchContent.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload.hits;
        state.totalPages = action.payload.nbPages;
        state.totalHits = action.payload.nbHits;
      })
      .addCase(fetchContent.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export const { setQuery, setCurrentPage } = contentSlice.actions;
export default contentSlice.reducer;
