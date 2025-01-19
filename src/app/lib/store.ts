import { configureStore } from "@reduxjs/toolkit";
import todosReducer from "./features/todo"; 
import userSlice from "./features/coins"; 
import marketSlice from "../marketdata/marketdatacap";
const store = configureStore({
  reducer: {
    todos: todosReducer, 
    user: userSlice,   
    market: marketSlice
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
