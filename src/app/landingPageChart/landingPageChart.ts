import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

interface inputValues {
  chartNameEPage: string,
  chartCurrencyEPage: string
}

export const fetchChartData = createAsyncThunk("chart/fetchChartData",
async({chartNameEPage, chartCurrencyEPage}: inputValues) => {
const response = await fetch(`https://api.coingecko.com/api/v3/coins/${chartNameEPage}/market_chart?vs_currency=${chartCurrencyEPage}&days=300`);
const jsonData = await response.json();
return jsonData;
});

interface BitcoinData {
  prices: [];
  total_volumes: [];
  market_caps: [];
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