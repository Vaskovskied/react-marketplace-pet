import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IActiveCategory } from "../../models/models";

const initialState: IActiveCategory = { value: "all" }; // "all" for not assigned

export const activeCategorySlice = createSlice({
  name: "activeCategory",
  initialState,
  reducers: {
    setActiveCategory(state, action: PayloadAction<string>) {
      state.value = action.payload;
    },
  },
});

export const { setActiveCategory } = activeCategorySlice.actions;

export default activeCategorySlice.reducer;
