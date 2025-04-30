import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type CoinData = {
    id: string;
    date: string,
    amount: number,
    idUnique: number,
}

type CoinDataState = CoinData[];

const initialState: CoinDataState = [];

export const portfolioCoinItemsSlice = createSlice({
    name: "portfolioCoinItems",
    initialState,
    reducers: {
        addCoins: (state, action: PayloadAction<{ id: string, date: string, amount: number, idUnique: number }>) => {
            const { id, date, amount, idUnique } = action.payload;
            const newCoin: CoinData = { id, date, amount, idUnique };
            state.push(newCoin);
        },
        removeCoins: (state, action: PayloadAction<number>) => {
            return state.filter((el) => el.idUnique !== action.payload);
        }
    }
});

export const { addCoins, removeCoins } = portfolioCoinItemsSlice.actions;
export default portfolioCoinItemsSlice.reducer;
export type { CoinDataState };
