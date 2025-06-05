import { createAsyncThunk } from "@reduxjs/toolkit";
import { getCampers } from "../../api/campersApi";
import { ITEMS_PER_PAGE } from "../../constants/uiConstants";

export const fetchCampersThunk = createAsyncThunk(
  "campers/fetchAll",
  async (options = {}, { rejectWithValue }) => {
    try {
      const { page = 1, params = {} } = options;
      const { location, form, equipment = [] } = params;

      const equipmentMap = equipment.reduce((acc, key) => {
        if (key === "Automatic") {
          acc.transmission = "automatic";
        } else if (["AC", "TV"].includes(key)) {
          acc[key] = true;
        } else if (["Kitchen", "Bathroom"].includes(key)) {
          acc[key.toLowerCase()] = true;
        }
        return acc;
      }, {});

      const transformedParams = {
        ...(location && { location }),
        ...(form && { form }),
        ...equipmentMap,
      };

      const { items, total } = await getCampers({ page, ...transformedParams });

      const hasMore = page * ITEMS_PER_PAGE < total;

      return { items, page, hasMore };
    } catch (error) {
      if (error.response?.status === 404) {
        return rejectWithValue("There are no campers for your request.");
      }

      return rejectWithValue("Something went wrong. Try again later.");
    }
  }
);
