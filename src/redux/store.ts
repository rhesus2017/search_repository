import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage/session";
import keywordReducer from "./keywordSlice";

type RootStateType = ReturnType<typeof rootReducer>;

const rootReducer = combineReducers({
  keyword: keywordReducer,
});

const persistConfig = {
  key: "root",
  storage,
  whitelists: [""],
};

const persistedReducer = persistReducer<RootStateType>(
  persistConfig,
  rootReducer
);

const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== "production",
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
