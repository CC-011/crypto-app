import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchChartData = createAsyncThunk("chart/fetchChartData",
async() => {
const response = await fetch("https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=180&interval=daily");
const jsonData = await response.json();
return jsonData;
});

interface BitcoinData {
  prices: [];
  total_volumes: [];
}

interface BitcoinPricesAndTotal_Volumes {
  chartData: BitcoinData | null;
  loading: boolean;
  error: string | null;
}

const initialState: BitcoinPricesAndTotal_Volumes = {
  chartData: null,
  loading: false,
  error: null,
};

export const chartSlice = createSlice({
    name: "chart",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(fetchChartData.pending, (state) => {
            state.loading = true; 
            state.error = null; 
          })
          .addCase(fetchChartData.fulfilled, (state, action) => {
            state.loading = false; 
            state.chartData = action.payload; 
          });
    }
});

export default chartSlice.reducer;