import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
export const fetchUserData = createAsyncThunk("user/fetchUserData", async () => {
  const response = await fetch("https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=180&interval=daily");
  const jsonData = await response.json();
  return jsonData;
});

export const userSlice = createSlice({
  name: "user", 
  initialState: { data: null, loading: false, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
    .addCase(fetchUserData.pending, (state) => {
      state.loading = true;
    })
    .addCase(fetchUserData.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
    });
  }
});
export default userSlice.reducer;