import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
export const fetchIndividuallCoinInfo = createAsyncThunk("coin/fetchIndividuallCoinInfo", async( data: string ) => {
    const response = await fetch(`https://api.coingecko.com/api/v3/coins/${data}?localization=false&tickers=false&market_data=true&community_data=true&developer_data=false&sparkline=false`);
    const jsonData = await response.json();
    return jsonData;
});

interface IndividualCoinInfo {
    name: string,
    id: string,
    image: { large: string },
    symbol: string,
    links: { homepage: string, whitepaper: string, blockchain_site: string },
    last_updated: string,
    market_data: { current_price: { usd: number }, high_24h: { usd: number }, low_24h: { usd: number}, market_cap: { usd: number }, fully_diluted_valuation: { usd: number }, market_cap_change_24h: number, total_volume: { usd: number }, circulating_supply: number, max_supply: number },
    market_cap_change_24h: number,
    circulating_supply: number,
    description: { en: string } 
    error: string
}

interface fetchIndividualCoinInfo {
    coinDescription: IndividualCoinInfo | null,
    loading: boolean,
    error: string | null 
}

const initialState: fetchIndividualCoinInfo = {
    coinDescription: null,
    loading: false,
    error: null
};

export const coinDescriptionSlice = createSlice({
    name: "coinInfo",
    initialState,
  reducers: {},
    extraReducers: (builder) => {
       builder
       .addCase(fetchIndividuallCoinInfo.pending, (state) => {
           state.loading = true;
       })
       .addCase(fetchIndividuallCoinInfo.fulfilled, (state, action) => {
           state.loading = false;
           state.coinDescription = action.payload;
       });
    }
   });
   
   export default coinDescriptionSlice.reducer;