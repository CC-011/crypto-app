import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: string = "usd";

export const currency = createSlice({
    name: "currencyState",
    initialState,
    reducers: {
        setCurrency: (_, action: PayloadAction<string>) => action.payload,
    }
});

export const { setCurrency } = currency.actions;
export default currency.reducer;