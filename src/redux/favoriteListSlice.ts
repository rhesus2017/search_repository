import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RepositoryListItem } from "../models/repository";

const initialState: RepositoryListItem[] = [];

export const favoriteListSlice = createSlice({
  name: "favoriteList",
  initialState,
  reducers: {
    setReduxFavoriteList: (_state, action: PayloadAction<RepositoryListItem[]>) => {
      return action.payload;
    },
  },
});

export const { setReduxFavoriteList } = favoriteListSlice.actions;
export default favoriteListSlice.reducer;
