import { createSlice } from "@reduxjs/toolkit";

export const conversaionSlice = createSlice({
  name: "conversaion",
  initialState: {
    friend: null,
    group: null,
  },
  reducers: {
    selectConversation: (state, action) => {
      state.friend = action.payload;
    },
    selectGroup: (state, action) => {
      state.group = action.payload;
    },
  },
});

export const { selectConversation, selectGroup } = conversaionSlice.actions;

export default conversaionSlice.reducer;
