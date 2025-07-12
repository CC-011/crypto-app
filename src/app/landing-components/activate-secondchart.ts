import { createSlice } from "@reduxjs/toolkit";

const initialState: boolean = false;

export const showSecondChart = createSlice({
    name: "secondChartState",
    initialState,
    reducers: {
        compareMode: (state) => !state,
    }
});

export const { compareMode } = showSecondChart.actions;
export default showSecondChart.reducer;