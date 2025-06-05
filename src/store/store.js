import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
  persistReducer,
  persistStore,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import { configureStore } from "@reduxjs/toolkit";
import { campersReducer } from "./campers/campersSlice";

const persistCamoersConfig = {
  key: "campers",
  storage,
  whitelist: ["favoriteItems"],
};

const persistedCampersReducer = persistReducer(
  persistCamoersConfig,
  campersReducer
);

const reducer = {
  campers: persistedCampersReducer,
};

export const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
