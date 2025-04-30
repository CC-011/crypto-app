import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

interface inputValues {
  secondChartName: string,
  chartCurrencyEPage: string
}

export const fetchSecondCoinData = createAsyncThunk("chart/secondCoinChart",
  async ({ secondChartName, chartCurrencyEPage }: inputValues) => {
    const response = await fetch(`https://api.coingecko.com/api/v3/coins/${secondChartName}/market_chart?vs_currency=${chartCurrencyEPage}&days=300`);
    const jsonData = await response.json();
    return jsonData;
  });

interface BitcoinData {
  prices: [];
  total_volumes: [];
  market_caps: [];
}

interface BitcoinPricesAndTotal_Volumes {
  chartDataSecondCoin: BitcoinData | null;
  loading: boolean;
  error: string | null;
}

const initialState: BitcoinPricesAndTotal_Volumes = {
  chartDataSecondCoin: null,
  loading: false,
  error: null,
};

export const secondCoinChartSlice = createSlice({
  name: "secondCoinChart",
  initialState,
  reducers: {
    setState: (state, action: PayloadAction<null>) => {
      state.loading = false;
      state.error = null;
      state.chartDataSecondCoin = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSecondCoinData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSecondCoinData.fulfilled, (state, action) => {
        state.loading = false;
        state.chartDataSecondCoin = action.payload;
      });
  }
});
export const { setState } = secondCoinChartSlice.actions;
export default secondCoinChartSlice.reducer;