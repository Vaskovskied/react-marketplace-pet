import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ISortState, TSortType } from "../../models/models";

const initialState: ISortState = {
  sortTypes: [
    { id: 0, title: "by default", header: "" },
    { id: 1, title: "ascending", header: "?sort=asc" },
    { id: 2, title: "descending", header: "?sort=desc" },
  ],
  selectedSort: { id: 0, title: "by default", header: "" },
};

export const sortSlice = createSlice({
  name: "sort",
  initialState,
  reducers: {
    setSelectedSort(state, action: PayloadAction<TSortType>) {
      state.selectedSort = action.payload;
    },
  },
});

export const { setSelectedSort } = sortSlice.actions;

export default sortSlice.reducer;
