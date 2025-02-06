import { configureStore } from "@reduxjs/toolkit";
import todosReducer from "./features/todo"; 
import userSlice from "./features/coins"; 
import marketSlice from "../marketdata/marketdatacap";
import chartSlice from "../landingPageChart/landingPageChart";
import tableSlice from "../tableChart/table";
const store = configureStore({
  reducer: {
    todos: todosReducer, 
    user: userSlice,   
    market: marketSlice,
    chart: chartSlice,
    table: tableSlice
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
