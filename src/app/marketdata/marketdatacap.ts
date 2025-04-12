import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
export const marketDataCap = createAsyncThunk("market/fetchMarketData", async() => {
    const response = await fetch("https://api.coingecko.com/api/v3/global");
    const jsonData = await response.json();
    return jsonData.data; 

});

interface MarketData {
  active_cryptocurrencies: number;
  total_market_cap: { usd: number };
  market_cap_percentage: { btc: number, eth: number };
  total_volume: { usd: number };

}

interface MarketState {
  data: MarketData | null;
  loading: boolean;
  error: string | null;
}

const initialState: MarketState = {
  data: null,
  loading: false,
  error: null,
};

export const marketSlice = createSlice({
  name: "market", 
  initialState ,
  reducers: {},
  extraReducers: (builder) => {
    builder
    .addCase(marketDataCap.pending, (state) => {
      state.loading = true;
    })
    .addCase(marketDataCap.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
    });
  }
});

export default marketSlice.reducer;