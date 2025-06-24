import { createSlice } from "@reduxjs/toolkit";

const initialState: boolean = false;

export const booleanSlice = createSlice({
    name: "booleanState",
    initialState,
    reducers: {
        toggleBoolean: (state) => !state,
    }
});

export const { toggleBoolean } = booleanSlice.actions;
export default booleanSlice.reducer;