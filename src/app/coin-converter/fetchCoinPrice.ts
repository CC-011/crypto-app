import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

interface inputValues {
  coinNameOne: string | null,
  coinInterval: number
}

export const fetchConverterData = createAsyncThunk("chart/fetchChartData",
  async ({ coinNameOne, coinInterval }: inputValues) => {
    const response = await fetch(`https://api.coingecko.com/api/v3/coins/${coinNameOne}/market_chart?vs_currency=usd&days=${coinInterval}`);
    const jsonData = await response.json();
    return jsonData;
  });

interface BitcoinData {
  prices: [number, number][];
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

export const converterSlice = createSlice({
  name: "chart",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchConverterData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchConverterData.fulfilled, (state, action) => {
        state.loading = false;
        state.chartData = action.payload;
      });
  }
});

export default converterSlice.reducer;