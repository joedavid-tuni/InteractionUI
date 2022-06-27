import { createSlice } from "@reduxjs/toolkit";

const rightDrawerSlice = createSlice({
    name: "rightSlide",
    initialState: {
      isOpen: false,
      tree: []
    },
    reducers: {
      open(state) {
        state.isOpen = true;
      },
      close(state) {
        state.isOpen = false;
      },
      setTree(state, actions) {
        state.tree = actions.payload;
      }
    }
  });

export const rightDrawerActions = rightDrawerSlice.actions;
  export default rightDrawerSlice.reducer;