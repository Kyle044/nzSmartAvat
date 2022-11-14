import { configureStore, createSlice } from "@reduxjs/toolkit";

const audioSlice = createSlice({
  name: "audio",
  initialState: { audioState: new Audio("/assets/resources/blank.wav") },
  reducers: {
    play(state, action) {
      state.audioState.pause();
      state.audioState.currentTime = 0;
      state.audioState = action.payload;
      state.audioState.play();
    },
    pause(state) {},
    stop(state) {}
  }
});

export const audioActions = audioSlice.actions;

export default audioSlice;
