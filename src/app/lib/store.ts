import { configureStore } from "@reduxjs/toolkit";
import todosReducer from "./features/todo";
import marketSlice from "../marketdata/marketdatacap";
import chartSlice from "../landingPageChart/landingPageChart";
import tableSlice from "../tableChart/table";
import coinDescriptionSlice from "../coins/coin";
import secondCoinChartSlice from "../landingPageChart/secondLandingPageChart";
import portfolioCoinItems from "../portfolio/payload";
import booleanSlice from "../navbarComponent/hide-chart";
import hideSearchBarMenu from "../portfolio/hide-menu";
import converterSlice from "../coin-converter/fetchCoinPrice";
import stringSlice from "../coin-converter/currency-selector";
const store = configureStore({
  reducer: {
    todos: todosReducer,
    market: marketSlice,
    chart: chartSlice,
    secondCoin: secondCoinChartSlice,
    table: tableSlice,
    coin: coinDescriptionSlice,
    coinItems: portfolioCoinItems,
    boolean: booleanSlice,
    hide: hideSearchBarMenu,
    converter: converterSlice,
    converterCurrency: stringSlice
  },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
