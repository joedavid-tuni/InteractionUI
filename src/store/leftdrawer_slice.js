import { createSlice } from "@reduxjs/toolkit";

const leftDrawerSlice = createSlice({
  name: "leftSlide",
  initialState: {
    isOpen: false
  },
  reducers: {
    open(state) {
      state.isOpen = true;
    },
    close(state) {
      state.isOpen = false;
    }
  }
});

export const leftDrawerActions = leftDrawerSlice.actions;
export default leftDrawerSlice.reducer;