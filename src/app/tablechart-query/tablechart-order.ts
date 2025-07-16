import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: string = "market_cap_desc";

export const tableOrder = createSlice({
    name: "orderState",
    initialState,
    reducers: {
        setOrder: (_, action: PayloadAction<string>) => action.payload,
    }
});

export const { setOrder } = tableOrder.actions;
export default tableOrder.reducer;