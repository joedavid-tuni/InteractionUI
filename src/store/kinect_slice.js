import { createSlice } from "@reduxjs/toolkit";

const kinectSlice = createSlice({
    name: "kinect",
    initialState: {
      onState: false
    },
    reducers: {
      toggleOnState(state) {
        if (state.onState === true) {
          state.onState = false;
        } else {
          state.onState = true;
        };
      }
    }
  });

  export const kinectActions = kinectSlice.actions;
  export default kinectSlice.reducer;