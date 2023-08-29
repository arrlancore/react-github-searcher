import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "lib/api";

export const searchGithub = createAsyncThunk(
  "search/searchGithub",
  async ({ query, type, page = 1, pageSize }, thunkAPI) => {
    const key = `${query}_${type}_${page}_${pageSize}`;
    const existingData = thunkAPI.getState().search.data[key];

    // return existing data from store
    if (existingData) {
      return existingData;
    }

    try {
      const response = await api.get(
        `search/${type}?q=${query}&per_page=${pageSize}&page=${page}`
      );
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Something went wrong on fetching.."
      );
    }
  }
);

const standardizeTotalPages = (serverCount, pageSize = 9) => {
  // github only allow the first 1000 search result
  const maxCountLimit = 1000;
  const totalCount = serverCount > maxCountLimit ? maxCountLimit : serverCount;

  return Math.ceil(totalCount / pageSize);
};

const searchSlice = createSlice({
  name: "search",
  initialState: {
    data: {},
    status: "idle",
    error: null,
    currentPage: 1,
    totalPages: 1,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(searchGithub.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(searchGithub.fulfilled, (state, action) => {
        const { query, type, page, pageSize } = action.meta.arg;
        const key = `${query}_${type}_${page}_${pageSize}`;
        state.data[key] = action.payload;
        state.status = "succeeded";
        state.currentPage = action.meta.arg.page;
        state.totalPages = standardizeTotalPages(action.payload.total_count, 9);
        state.error = null;
      })
      .addCase(searchGithub.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

const searchReducer = searchSlice.reducer;

export default searchReducer;
