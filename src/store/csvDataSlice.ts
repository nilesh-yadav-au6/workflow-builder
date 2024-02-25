import { createSlice, current } from "@reduxjs/toolkit";
import { RootState } from "./store";
import { DataItem, computeTable } from "../utils/helper";

export type csvData = {
  data: Array<object>;
  computedData: DataItem[];
  headers: Array<string>;
};

const initialState: csvData = {
  data: [],
  computedData: [],
  headers: [],
};

export const csvDataSlice = createSlice({
  name: "csvData",
  initialState,
  reducers: {
    addCsvData: (state, action) => {
      const columns = Object.keys(action.payload[0]);
      state.headers = columns;
      state.data = action.payload;
    },
    computNewCsvData: (state, action) => {
      const clone = [...current(state.data)];
      const val = computeTable(
        action.payload.head,
        clone as DataItem[],
        action.payload.nodes
      );
      state.computedData = val;
    },
    clearComputedData: (state) => {
      state.computedData = [];
    },
  },
});

export const { addCsvData, computNewCsvData, clearComputedData } =
  csvDataSlice.actions;

export const selectCsvDataList = (state: RootState) => state;

export default csvDataSlice.reducer;
