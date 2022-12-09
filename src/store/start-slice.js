import { configureStore, createSlice } from "@reduxjs/toolkit";

const startSlice = createSlice({
  name: "start",
  initialState: { start: 0, end: 0, campaign: "" },
  reducers: {
    set(state, action) {
      state.start = action.payload;
    },
    end(state, action) {
      state.end = action.payload;
    },
    setCampaign(state, action) {
      state.campaign = action.payload;
    },
    reset(state, action) {
      state.time = 0;
    }
  }
});

export const startActions = startSlice.actions;

export default startSlice;
