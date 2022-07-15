import { createSlice } from "@reduxjs/toolkit";

const messageDrawerSlice = createSlice({
    name: "imPanel",
    initialState: {
      isOpen: false,
      imData: {type: "",value: ""}
    },
    reducers: {
      open(state) {
        state.isOpen = true;
      },
      close(state) {
        state.isOpen = false;
      },
      setImData(state, actions) {
        state.imData = actions.payload;
      }
    }
  });

  export const messageDrawerActions = messageDrawerSlice.actions;
  export default messageDrawerSlice.reducer;