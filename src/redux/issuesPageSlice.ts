import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: boolean = false;

export const issuesPageSlice = createSlice({
  name: "issuesPage",
  initialState,
  reducers: {
    setReduxIssuesPage: (_state, action: PayloadAction<boolean>) => {
      return action.payload;
    },
  },
});

export const { setReduxIssuesPage } = issuesPageSlice.actions;
export default issuesPageSlice.reducer;
