import { createSlice } from "@reduxjs/toolkit";

const leftDrawerSlice = createSlice({
  name: "leftSlide",
  initialState: {
    isOpen: false,
    productionTask : { },
    processPlanName: "No Process Selected",
    processPlan: [],
  },
  reducers: {
    open(state) {
      state.isOpen = true;
    },
    close(state) {
      state.isOpen = false;
    },
    setProductionTask(state, actions){
      state.productionTask = actions.payload;
    },
    setProcessPlanName(state, actions) {
      state.processPlanName = actions.payload;
    },
    setProcessPlan(state, actions) {
      state.processPlan = actions.payload;
    }
  }
});

export const leftDrawerActions = leftDrawerSlice.actions;
export default leftDrawerSlice.reducer;