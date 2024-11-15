// src/redux/contentSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'https://hn.algolia.com/api/v1/search';

// Cache object to store previous requests
const cache = new Map();
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes in milliseconds

// Rate limiting variables
let lastRequestTime = 0;
const MIN_REQUEST_INTERVAL = 100; // Minimum 100ms between requests

// Helper function to generate cache key
const getCacheKey = (params) => {
  return JSON.stringify(params);
};

// Helper function to check if cache is valid
const isCacheValid = (cacheEntry) => {
  return cacheEntry && (Date.now() - cacheEntry.timestamp) < CACHE_DURATION;
};

// Helper function to enforce rate limiting
const enforceRateLimit = async () => {
  const now = Date.now();
  const timeSinceLastRequest = now - lastRequestTime;
  
  if (timeSinceLastRequest < MIN_REQUEST_INTERVAL) {
    await new Promise(resolve => 
      setTimeout(resolve, MIN_REQUEST_INTERVAL - timeSinceLastRequest)
    );
  }
  lastRequestTime = Date.now();
};

export const fetchContent = createAsyncThunk(
  'content/fetchContent',
  async ({ query = '', page = 0, filters = {} }, { rejectWithValue }) => {
    try {
      // API parameters
      const apiParams = {
        page: page.toString(),
      };

      // Add query if exists
      if (query) {
        apiParams.query = query;
      }

      // Handle tags
      if (filters.tags) {
        apiParams.tags = filters.tags;
      }

      // Handle sorting - parameter names may or may not match for error refer Algolia API docs
      if (filters.sort) {
        if (filters.sort === 'points') {
          apiParams.numericFilters = 'points>0';
          apiParams.sort = 'points';
        } else if (filters.sort === 'created_at_i') {
          apiParams.sort = 'created_at_i';
        }
      }

      // Handle time filters
      if (filters.numericFilters && filters.numericFilters !== 'all') {
        // If we already have numericFilters for points, we need to combine them
        const existingFilters = apiParams.numericFilters ? [apiParams.numericFilters] : [];
        existingFilters.push(filters.numericFilters);
        apiParams.numericFilters = existingFilters.join(',');
      }

      // Generate cache key
      const cacheKey = getCacheKey(apiParams);

      // Check cache first
      const cachedResult = cache.get(cacheKey);
      if (isCacheValid(cachedResult)) {
        return cachedResult.data;
      }

      // Enforce rate limit
      await enforceRateLimit();

      // Make API request
      const params = new URLSearchParams();
      Object.entries(apiParams).forEach(([key, value]) => {
        if (value) params.append(key, value);
      });

      console.log('API Request URL:', `${API_URL}?${params.toString()}`); // Debug log

      const response = await axios.get(`${API_URL}?${params.toString()}`, {
        headers: {
          'Content-Type': 'application/json',
        },
        // timeout: 5000 // slowing the refereshing
      });

      // Cache the result
      cache.set(cacheKey, {
        data: response.data,
        timestamp: Date.now()
      });

      return response.data;

    } catch (error) {
      console.error('API Error:', error.response?.data || error.message);
      if (error.response?.status === 429) {
        return rejectWithValue('Rate limit exceeded. Please try again later.');
      }
      return rejectWithValue(error.response?.data?.message || 'An error occurred');
    }
  }
);

// Clean up expired cache entries periodically
setInterval(() => {
  for (const [key, value] of cache.entries()) {
    if (!isCacheValid(value)) {
      cache.delete(key);
    }
  }
}, CACHE_DURATION);

const contentSlice = createSlice({
  name: 'content',
  initialState: {
    items: [],
    query: '',
    status: 'idle',
    error: null,
    currentPage: 0,
    totalPages: 0,
    totalHits: 0,
    currentFilters: {
      tags: 'story',
      sortBy: 'points',
      numericFilters: null
    }
  },
  reducers: {
    setQuery: (state, action) => {
      state.query = action.payload;
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    setFilters: (state, action) => {
      state.currentFilters = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchContent.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchContent.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload.hits;
        state.totalPages = action.payload.nbPages;
        state.totalHits = action.payload.nbHits;
        state.error = null;
      })
      .addCase(fetchContent.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || action.error.message;
      });
  },
});

export const { setQuery, setCurrentPage, setFilters } = contentSlice.actions;
export default contentSlice.reducer;
