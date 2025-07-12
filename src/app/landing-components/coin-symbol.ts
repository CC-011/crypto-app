import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: string = "BTC";

export const coinSymbol = createSlice({
    name: "symbolState",
    initialState,
    reducers: {
        setSymbol: (_, action: PayloadAction<string>) => action.payload,
    }
});

export const { setSymbol } = coinSymbol.actions;
export default coinSymbol.reducer;