import { configureStore } from "@reduxjs/toolkit";

import startSlice from "./start-slice";
import callSlice from "./call-slice";
import audioSlice from "./audio-slice";

const store = configureStore({
  reducer: {
    start: startSlice.reducer,
    call: callSlice.reducer,
    audio: audioSlice.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false
    })
});

export default store;
