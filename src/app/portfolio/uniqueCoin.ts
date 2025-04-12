import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

interface userInput {
    coin: string,
    date: string
}

export const coinValueAfterPurchase = createAsyncThunk("coinValue/coinValueAfterPurchase", async({coin, date}: userInput) => {
    const response = await fetch(`https://api.coingecko.com/api/v3/coins/${coin}/history/?date=${date}`);
    const jsonData = await response.json();
    return jsonData;
});

export const portfolioSlice = createSlice({
    name: "coinValueAfterPurchase",
    initialState: { coinValue: null, loading: false, error: null },
  reducers: {},
    extraReducers: (builder) => {
       builder
       .addCase(coinValueAfterPurchase.pending, (state) => {
           state.loading = true;
       })
       .addCase(coinValueAfterPurchase.fulfilled, (state, action) => {
           state.loading = false;
           state.coinValue = action.payload;
       });
    }
   });
   
   export default portfolioSlice.reducer;