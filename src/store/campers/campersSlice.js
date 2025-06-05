import { createSlice } from "@reduxjs/toolkit";
import { fetchCampersThunk } from "./campertThunks";

export const selectCampers = (state) => state.campers.items;
export const selectFavoriteCampers = (state) => state.campers.favoriteItems;
export const selectIsLoading = (state) => state.campers.isLoading;
export const selectError = (state) => state.campers.error;
export const selectCurrentPage = (state) => state.campers.currentPage;
export const selectFilters = (state) => state.campers.filters;
export const selectHasMore = (state) => state.campers.hasMore;

const initialState = {
  items: [],
  favoriteItems: [],
  isLoading: false,
  error: "",
  currentPage: 1,
  hasMore: true,
  filters: {
    location: "",
    equipment: [],
    form: "",
  },
};

const campersSlice = createSlice({
  name: "campers",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchCampersThunk.fulfilled, (state, { payload }) => {
        const { items, page, hasMore } = payload;

        if (page === 1) {
          state.items = items;
        } else {
          state.items.push(...items);
        }

        state.currentPage = page;
        state.hasMore = hasMore;
      })
      .addMatcher(
        ({ type }) => type.endsWith("/pending"),
        (state) => {
          state.isLoading = true;
          state.error = "";
        }
      )
      .addMatcher(
        ({ type }) => type.endsWith("/fulfilled"),
        (state) => {
          state.isLoading = false;
          state.error = "";
        }
      )
      .addMatcher(
        ({ type }) => type.endsWith("/rejected"),
        (state, { payload }) => {
          state.isLoading = false;
          state.error = payload;
          state.hasMore = false;
        }
      );
  },
  reducers: {
    addToFavoriteItemsAction: (state, { payload }) => {
      state.favoriteItems.unshift(payload);
    },
    removeFromFavoriteItemsAction: (state, { payload }) => {
      state.favoriteItems = state.favoriteItems.filter(
        (camper) => camper._id !== payload
      );
    },
    setFiltersAction: (state, { payload }) => {
      state.filters.location = payload.location;
      state.filters.equipment = payload.equipment;
      state.filters.form = payload.form;
    },

    clearFiltersAction: (state) => {
      state.filters.location = "";
      state.filters.equipment = [];
      state.filters.form = "";
    },
  },
});

export const campersReducer = campersSlice.reducer;

export const campersActions = campersSlice.actions;
