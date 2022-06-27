import { createSlice } from "@reduxjs/toolkit";

const blinkingSlice = createSlice({
    name: "blinking",
    initialState: {
      blinkingState: true
    },
    reducers: {
      toggleBlinkingState(state) {
        if (state.blinkingState === true) {
          state.blinkingState = false;
        } else {
          state.blinkingState = true;
        };
      }
    }
  });

  export const blinkingActions = blinkingSlice.actions;
  export default blinkingSlice.reducer;