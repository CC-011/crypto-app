import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
export const fetchTableChart = createAsyncThunk("table/fetchTableData", async() => {
    const response = await fetch("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=1&sparkline=true&price_change_percentage=1h%2C24h%2C7d");
    const jsonData = await response.json();
    return jsonData;
});

interface tableChartData {
    name: string,
    id: number,
    image: string,
    high_24h: number,
    price_change_percentage_1h_in_currency: number,
    price_change_24h: number,
    price_change_percentage_7d_in_currency: number,
    market_cap_change_24h: number,
    circulating_supply: number,
    total_volume: number,
    market_cap: number,
    total_supply: number,
    current_price: number,
    price_change_percentage_24h: number
    sparkline_in_7d: {
     price: number[]
    }
}

interface fetchtableChartData {
    tableChart: tableChartData[] | null,
    loading: boolean,
    error: string | null 
}

const initialState: fetchtableChartData = {
    tableChart: null,
    loading: false,
    error: null
};

export const tableSlice = createSlice({
 name: "table",
 initialState,
 reducers: {},
 extraReducers: (builder) => {
    builder
    .addCase(fetchTableChart.pending, (state) => {
        state.loading = true;
    })
    .addCase(fetchTableChart.fulfilled, (state, action) => {
        state.loading = false;
        state.tableChart = action.payload;
    });
 }
});

export default tableSlice.reducer;