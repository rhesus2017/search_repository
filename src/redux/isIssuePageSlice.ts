import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: boolean = false;

export const isIssuesPageSlice = createSlice({
  name: "isIssuesPage",
  initialState,
  reducers: {
    setReduxIsIssuesPage: (_state, action: PayloadAction<boolean>) => {
      return action.payload;
    },
  },
});

export const { setReduxIsIssuesPage } = isIssuesPageSlice.actions;
export default isIssuesPageSlice.reducer;
