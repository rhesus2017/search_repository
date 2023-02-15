import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: string = "";

export const keywordSlice = createSlice({
  name: "keyword",
  initialState,
  reducers: {
    setReduxKeyword: (_state, action: PayloadAction<string>) => {
      return action.payload;
    },
  },
});

export const { setReduxKeyword } = keywordSlice.actions;
export default keywordSlice.reducer;
