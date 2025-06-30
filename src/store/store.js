import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slices/authSlice";
import conversaionSlice from "./slices/conversationSlice";

export default configureStore({
  reducer: {
    userData: authSlice,
    activeFriend: conversaionSlice,
  },
});
