import { createSlice } from "@reduxjs/toolkit";

export const conversaionSlice = createSlice({
  name: "conversaion",
  initialState: {
    friend: null,
  },
  reducers: {
    selectConversation: (state, action) => {
      state.friend = action.payload;
    },
  },
});

export const { selectConversation } = conversaionSlice.actions;

export default conversaionSlice.reducer;
