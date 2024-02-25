import { configureStore } from "@reduxjs/toolkit";
import nodeSlice from "./nodeSlice";
import { csvDataSlice } from "./csvDataSlice";

export const store = configureStore({
  reducer: {
    node: nodeSlice,
    csvData: csvDataSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
