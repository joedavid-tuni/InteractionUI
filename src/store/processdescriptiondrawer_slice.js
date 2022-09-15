import { createSlice } from "@reduxjs/toolkit";

const processDescriptionDrawerSlice = createSlice({
    name: "processDescriptionSlice",
    initialState: {
        isOpen: false,
        processDescription: [],
    },
    reducers: {
        open(state) {
            state.isOpen = true;
        },
        close(state) {
            state.isOpen = false;
        },
        setProcessDescription(state, actions) {
            state.processDescription = actions.payload;
        }
    }
});

export const processDescriptionActions = processDescriptionDrawerSlice.actions;
export default processDescriptionDrawerSlice.reducer;