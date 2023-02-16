import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import keywordReducer from "./keywordSlice";
import favoriteListReducer from "./favoriteListSlice";
import issuesPageReducer from "./issuesPageSlice";

type RootStateType = ReturnType<typeof rootReducer>;

const rootReducer = combineReducers({
  keyword: keywordReducer,
  favoriteList: favoriteListReducer,
  issuesPage: issuesPageReducer
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
  reducer: persistedReducer
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
