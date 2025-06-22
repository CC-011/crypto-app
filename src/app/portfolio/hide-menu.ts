import { createSlice } from "@reduxjs/toolkit";

const initialState: boolean = false;

export const hideSearchBarMenu = createSlice({
    name: "booleanState",
    initialState,
    reducers: {
        toggleCond: (state) => !state,
    }
});

export const { toggleCond } = hideSearchBarMenu.actions;
export default hideSearchBarMenu.reducer;