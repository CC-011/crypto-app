import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
export const coinPortfolioInfo = createAsyncThunk("portfolio/coinPortfolioInfo", async() => {
    const response = await fetch("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=bitcoin%2C%20ethereum&order=market_cap_desc&page=1&sparkline=true&price_change_percentage=1h%2C24h%2C7d");
    const jsonData = await response.json();
    return jsonData;
});

export const portfolioSlice = createSlice({
    name: "coinPortfolioInfo",
    initialState: { portfolio: null, loading: false, error: null },
  reducers: {},
    extraReducers: (builder) => {
       builder
       .addCase(coinPortfolioInfo.pending, (state) => {
           state.loading = true;
       })
       .addCase(coinPortfolioInfo.fulfilled, (state, action) => {
           state.loading = false;
           state.portfolio = action.payload;
       });
    }
   });
   
   export default portfolioSlice.reducer;