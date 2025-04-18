import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

interface UniqueObject {
  [key: string]: {
    currentPrice: number;
  };
}

interface Coin {
  id: string;
  amount: number;
  date: string;
}

interface uniqueObjectAndCoinInfoArray {
    uniqueObject: UniqueObject,
    coinArray: Coin[]
}

export const coinValueDataAfterPurchase = createAsyncThunk("coinAfterPurchase/coinValueDataAfterPurchase", async({uniqueObject, coinArray}: uniqueObjectAndCoinInfoArray) => {
    const pricedCoinsObject = await Promise.all(
        Object.keys(uniqueObject).map(async (key) => {
          const data = await fetch(`https://api.coingecko.com/api/v3/coins/${key}`);
          const json = await data.json();
         return uniqueObject[key].currentPrice = json.market_data.current_price.usd; 
        })
      );
      
       const newPortfolio = await Promise.all(
        coinArray.map(async (coin) => {
          const data = await fetch(
            `https://api.coingecko.com/api/v3/coins/${coin.id}/history?date=${coin.date}`
          );
          const json = await data.json();
          return {
            id: json.id,
            name: json.name,
            symbol: json.symbol,
            image: json.image.small,
            market_cap: json.market_data.market_cap.usd,
            total_volume: json.market_data.total_volume.usd,
            total: coin.amount * json.market_data.current_price.usd,
            previousPrice:  json.market_data.current_price.usd,
            currentPrice: uniqueObject[coin.id].currentPrice, 
            error: "",
            isBigger:
              json.market_data.current_price.usd > uniqueObject[coin.id].currentPrice
          };
        })
      );
      const mapped = newPortfolio.map((data) => {
        return {...data, price: pricedCoinsObject[0], idUnique: `${Math.random()}` };
      });
       
       return mapped;
});

interface PortfolioCoinInfo {
  name: string,
  id: string,
  image: string,
  symbol: string,
  market_cap: number,
  total_volume: number,
  total: number,
  previousPrice: number,
  currentPrice: number, 
  isBigger: boolean, 
  error?: string
}

interface fetchPortfolioCoinInfo {
  coinAfterPurchase: PortfolioCoinInfo[] | null,
  loading: boolean,
  error: string | null 
}

const initialState: fetchPortfolioCoinInfo = {
  coinAfterPurchase: [],
  loading: false,
  error: null
};

export const portfolioSlice = createSlice({
    name: "coinValueDataAfterPurchase",
    initialState,
  reducers: {},
    extraReducers: (builder) => {
       builder
       .addCase(coinValueDataAfterPurchase.pending, (state) => {
           state.loading = true;
       })
       .addCase(coinValueDataAfterPurchase.fulfilled, (state, action) => {
           state.loading = false;
           state.coinAfterPurchase = action.payload;
       });
    }
   });
   
   export default portfolioSlice.reducer;