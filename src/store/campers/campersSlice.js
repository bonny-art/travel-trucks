import { createSlice } from "@reduxjs/toolkit";
import { fetchCamperByIdThunk, fetchCampersThunk } from "./campertThunks";

export const selectCampers = (state) => state.campers.items;
export const selectFavoriteCampers = (state) => state.campers.favoriteItems;
export const selectIsLoading = (state) => state.campers.isLoading;
export const selectError = (state) => state.campers.error;
export const selectCurrentPage = (state) => state.campers.currentPage;
export const selectFilters = (state) => state.campers.filters;
export const selectFiltersInitialized = (state) =>
  state.campers.filtersInitialized;

export const selectTotalPages = (state) => state.campers.totalPages;
export const selectHasMore = (state) => state.campers.hasMore;

export const selectCurrentCamper = (state) => state.campers.camper;
export const selectCurrentCamperId = (state) => state.campers.camperId;

const initialState = {
  items: [],
  favoriteItems: [],
  isLoading: false,
  error: "",
  currentPage: 1,
  totalPages: 0,
  hasMore: true,
  camperId: "",
  camper: null,
  filters: {},
  filtersInitialized: false,
};

const campersSlice = createSlice({
  name: "campers",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchCampersThunk.pending, (state) => {
        state.isLoading = true;
        state.error = "";
      })
      .addCase(fetchCampersThunk.fulfilled, (state, { payload }) => {
        const { items, page, hasMore, totalPages } = payload;

        if (page === 1) {
          state.items = items;
        } else {
          const existingIds = new Set(state.items.map((item) => item.id));
          const newUniqueItems = items.filter(
            (item) => !existingIds.has(item.id)
          );
          state.items.push(...newUniqueItems);
        }

        state.hasMore = hasMore;
        state.totalPages = totalPages;
        state.isLoading = false;
        state.error = "";
      })
      .addCase(fetchCampersThunk.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload;
        state.hasMore = false;
      })
      .addCase(fetchCamperByIdThunk.pending, (state) => {
        state.isLoading = true;
        state.error = "";
        state.camper = null;
      })
      .addCase(fetchCamperByIdThunk.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.error = "";
        state.camper = payload;
      })
      .addCase(fetchCamperByIdThunk.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload;
        state.camper = null;
      });
  },
  reducers: {
    addToFavoriteItemsAction: (state, { payload }) => {
      state.favoriteItems.unshift(payload);
    },
    removeFromFavoriteItemsAction: (state, { payload }) => {
      state.favoriteItems = state.favoriteItems.filter(
        (camper) => camper.id !== payload
      );
    },
    setFiltersAction: (state, { payload }) => {
      state.filters = payload;
      state.filtersInitialized = true;
    },

    clearFiltersAction: (state) => {
      state.filters = {};
      state.filtersInitialized = true;
    },
    setCurrentPageAction: (state, { payload }) => {
      state.currentPage = Number(payload);
    },
    resetCampersState: (state) => {
      state.items = [];
      state.totalPages = 0;
      state.hasMore = true;
      state.filters = {};
      state.filtersInitialized = false;
    },
    resetCamperState: (state) => {
      state.camper = null;
      state.camperId = "";
    },
    setCamperId: (state, { payload }) => {
      state.camperId = payload;
    },
  },
});

export const campersReducer = campersSlice.reducer;

export const campersActions = campersSlice.actions;
