import { createSlice } from "@reduxjs/toolkit";

const configSlice = createSlice({
    name: "config",
    initialState: {
      radius: {
        caButton2: 0,
        cancelButton: 0,
        receiverButton: 0,
        sendButton: 0,
        taskButton: 0,
        actionButton: 0,
        caButton: 0,
        arrow: 0,
        updateButton: 0,
        stopStartButton: 0,
        settingsButton: 0
      },
      innerFrame: {
        left: 135,
        top: 0,
        width: 1561,
        height: 1062
      },
      dragBarsWidth: 10,
      arrowHeight: 80,
      treeView: {
        height: 80,
        fontSize: 20
      },
      rightSlideDefaultWidth: 300,
      leftSlideDefaultWidth: 300
    },
    reducers: {
      updateConfig: (state, actions) => {
        state.radius = actions.payload.radius;
        state.innerFrame = actions.payload.innerFrame;
        state.dragBarsWidth = actions.payload.dragBarsWidth;
        state.arrowHeight = actions.payload.arrowHeight;
        state.treeView = actions.payload.treeView;
        state.rightSlideDefaultWidth = actions.payload.rightSlideDefaultWidth;
        state.leftSlideDefaultWidth = actions.payload.leftSlideDefaultWidth;
      }
    }
  });
  
  export const configActions = configSlice.actions;
  export default configSlice.reducer;