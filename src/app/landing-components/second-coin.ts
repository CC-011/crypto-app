import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: string = "";

export const secondCoinName = createSlice({
    name: "coinNameState",
    initialState,
    reducers: {
        setCoinNameSecond: (_, action: PayloadAction<string>) => action.payload,
    }
});

export const { setCoinNameSecond } = secondCoinName.actions;
export default secondCoinName.reducer;