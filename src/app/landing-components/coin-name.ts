import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: string = "Bitcoin";

export const coinName = createSlice({
    name: "coinNameState",
    initialState,
    reducers: {
        setString: (_, action: PayloadAction<string>) => action.payload,
    }
});

export const { setString } = coinName.actions;
export default coinName.reducer;