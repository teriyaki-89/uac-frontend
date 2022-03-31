import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const configSlice = createSlice({
  name: "config",
  initialState: {
    value: {}
  },
  reducers: {
    updateConfig: (state, action) => {
      state.value = { ...state.value, ...action.payload };
    }
  },
  extraReducers: (reducer) => {}
});

export const { updateConfig } = configSlice.actions;

export const selectConfig = (state) => state.config.value;

export default configSlice.reducer;
