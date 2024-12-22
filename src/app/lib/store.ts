import { configureStore } from "@reduxjs/toolkit";
import todosReducer from "./features/todo"; // Adjust the path as needed
import userSlice from "./features/coins"; // Adjust the path as needed

const store = configureStore({
  reducer: {
    todos: todosReducer, // Add todos slice
    user: userSlice,   // Add user slice
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
