import { configureStore, createSlice } from "@reduxjs/toolkit";

const callSlice = createSlice({
  name: "call",
  initialState: { buttonClicked: [] },
  reducers: {
    addButton(state, action) {
      const newButton = action.payload;
      state.buttonClicked = [...state.buttonClicked, newButton];
    },
    clearButton(state) {
      state.buttonClicked = [];
    }
  }
});

export const callActions = callSlice.actions;

export default callSlice;
