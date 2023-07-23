import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./reducers/userReducer";

import {
  persistStore,
  FLUSH,
  persistReducer,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";

import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  storage,
};
const UserpersistedReducer = persistReducer(persistConfig, userReducer);

export const store = configureStore({
  reducer: {
    user: UserpersistedReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoreActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export let persistor = persistStore(store);
