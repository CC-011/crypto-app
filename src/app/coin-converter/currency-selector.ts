import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: string = "USD";

export const stringSlice = createSlice({
    name: "stringState",
    initialState,
    reducers: {
        setString: (_, action: PayloadAction<string>) => action.payload,
    }
});

export const { setString } = stringSlice.actions;
export default stringSlice.reducer;