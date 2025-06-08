import { createAsyncThunk } from "@reduxjs/toolkit";
import { getCamperById, getCampers } from "../../api/campersApi";
import { ITEMS_PER_PAGE } from "../../constants/ui";

export const fetchCampersThunk = createAsyncThunk(
  "campers/fetchAll",
  async (options = {}, { rejectWithValue }) => {
    try {
      const { page = 1, params = {} } = options;

      const { items, total } = await getCampers({ page, ...params });

      const totalPages = Math.ceil(total / ITEMS_PER_PAGE);
      const hasMore = page < totalPages;

      return { items, page, hasMore, totalPages };
    } catch (error) {
      if (error.response?.status === 404) {
        return rejectWithValue("There are no campers for your request.");
      }

      return rejectWithValue("Something went wrong. Try again later.");
    }
  }
);

export const fetchCamperByIdThunk = createAsyncThunk(
  "campers/fetchById",
  async (id, { rejectWithValue }) => {
    try {
      const data = await getCamperById(id);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
