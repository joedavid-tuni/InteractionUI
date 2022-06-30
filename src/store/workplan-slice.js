// DEPRECATED: USING LOCAL STATE IN TREEDROPDOWN (WORKPLAN MANAGEMENT AFTER SWITCHING TO REST)
import { createSlice } from "@reduxjs/toolkit";

const workplanSlice = createSlice({
    name: "workplan",
    initialState: [],
    reducers: {
        setWorkplan(state, actions){
            state = actions.payload;
        }

    }
});

export const workplanActions = workplanSlice.actions;
export default workplanSlice.reducer;