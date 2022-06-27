import { createSlice } from "@reduxjs/toolkit";


const interactionDrawerSlice = createSlice({
    name: "bottomSliede",
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

  export const interactionActions = interactionDrawerSlice.actions;
  export default interactionDrawerSlice.reducer;