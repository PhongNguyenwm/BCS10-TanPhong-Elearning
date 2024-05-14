import { configureStore } from "@reduxjs/toolkit";
import loadingSlice from "./slice/loadingSlice";

export const store = configureStore({
  reducer: {
    loadingSlice: loadingSlice,
  },
});
export default store;
