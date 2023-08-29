import { configureStore } from "@reduxjs/toolkit";
import searchReducer from "features/home/search-slice";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, searchReducer);

export const store = configureStore({
  reducer: {
    search: persistedReducer,
  },
});

export const persistor = persistStore(store);
