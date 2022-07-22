import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./slices/cartSlice";
import activeCategoryReducer from "./slices/activeCategorySlice";
const store = configureStore({
  reducer: {
    cart: cartReducer,
    activeCategory: activeCategoryReducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
