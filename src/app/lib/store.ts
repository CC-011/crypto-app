import { configureStore } from "@reduxjs/toolkit";
import todosReducer from "./features/todo"; 
import userSlice from "./features/coins"; 
import marketSlice from "../marketdata/marketdatacap";
import chartSlice from "../landingPageChart/landingPageChart";
import tableSlice from "../tableChart/table";
import coinDescriptionSlice from "../coins/coin";
import  coinPortfolioInfo  from "../portfolio/portfolio";
import coinValueAfterPurchase from "../portfolio/uniqueCoin";
import coinValueDataAfterPurchase from "../portfolio/gainedValue";
const store = configureStore({
  reducer: {
    todos: todosReducer, 
    user: userSlice,   
    market: marketSlice,
    chart: chartSlice,
    table: tableSlice,
    coin: coinDescriptionSlice,
    portfolio: coinPortfolioInfo,
    coinValue: coinValueAfterPurchase, 
    coinAfterPurchase: coinValueDataAfterPurchase
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
