import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "lib/api";

export const searchGithub = createAsyncThunk(
  "search/searchGithub",
  async ({ query, type, page = 1 }) => {
    const response = await api.get(
      `search/${type}?q=${query}&per_page=9&page=${page}`
    );
    return response.data;
  }
);

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
      })
      .addCase(searchGithub.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data[action.meta.arg.query] = action.payload;
        state.currentPage = action.meta.arg.page;
        state.totalPages = Math.ceil(action.payload.total_count / 9);
      })
      .addCase(searchGithub.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

const searchReducer = searchSlice.reducer;

export default searchReducer;
