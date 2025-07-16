import { configureStore } from "@reduxjs/toolkit";
import todosReducer from "./features/todo";
import portfolioCoinItems from "../portfolio/payload";
import showSecondChart from "../landing-components/activate-secondchart";
import booleanSlice from "../navbarComponent/hide-chart";
import hideSearchBarMenu from "../portfolio/hide-menu";
import stringSlice from "../coin-converter/currency-selector";
import coinName from "../landing-components/coin-name";
import coinSymbol from "../landing-components/coin-symbol";
import secondCoinName from "../landing-components/second-coin";
import currency from "../navbarComponent/currency";
import tableOrder from "../tablechart-query/tablechart-order";
const store = configureStore({
  reducer: {
    todos: todosReducer,
    secondChart: showSecondChart,
    coinItems: portfolioCoinItems,
    boolean: booleanSlice,
    hide: hideSearchBarMenu,
    converterCurrency: stringSlice,
    coinNameChart: coinName,
    coinSymbolChart: coinSymbol,
    secondCoin: secondCoinName,
    selectCurrency: currency,
    order: tableOrder
  },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
