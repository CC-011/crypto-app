import { configureStore } from "@reduxjs/toolkit";
import todosReducer from "./features/todo"; 
import marketSlice from "../marketdata/marketdatacap";
import chartSlice from "../landingPageChart/landingPageChart";
import tableSlice from "../tableChart/table";
import coinDescriptionSlice from "../coins/coin";
import coinValueDataAfterPurchase from "../portfolio/gainedValue";
const store = configureStore({
  reducer: {
    todos: todosReducer,   
    market: marketSlice,
    chart: chartSlice,
    table: tableSlice,
    coin: coinDescriptionSlice,
    coinAfterPurchase: coinValueDataAfterPurchase
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
