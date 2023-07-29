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
import matchReducer from "./reducers/matchReducer";

const persistConfig = {
  key: "root",
  storage,
};
const UserpersistedReducer = persistReducer(persistConfig, userReducer);
const MatchpersistedReducer = persistReducer(persistConfig, matchReducer);

export const store = configureStore({
  reducer: {
    user: UserpersistedReducer,
    match: MatchpersistedReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoreActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export let persistor = persistStore(store);

export const server = "https://datingwebapp.onrender.com";
