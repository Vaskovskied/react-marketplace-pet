import { ICart, ICartItem, IProduct } from "./../../models/models";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Big from "big.js";

const initialState: ICart = {
  items: [],
  allAmount: 0,
  allCost: 0,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addCartItem(state, action: PayloadAction<IProduct>) {
      const target = action.payload.id;
      const isInCart = state.items.findIndex(
        (item) => item.product.id === target
      );
      if (isInCart > -1) {
        state.items[isInCart].amount += 1;
        state.items[isInCart].allCost = Big(state.items[isInCart].allCost)
          .plus(action.payload.price)
          .toNumber();
      } else {
        state.items = [
          ...state.items,
          {
            product: action.payload,
            amount: 1,
            allCost: action.payload.price,
          },
        ];
      }
      state.allCost = Big(state.allCost).plus(action.payload.price).toNumber();
      state.allAmount += 1;
    },

    incrementCartItem(state, action: PayloadAction<ICartItem>) {
      const targetIndex = state.items.findIndex(
        (item) => item.product.id === action.payload.product.id
      );
      const item = state.items[targetIndex];
      state.items[targetIndex].allCost = Big(state.items[targetIndex].allCost)
        .plus(item.product.price)
        .toNumber();
      state.items[targetIndex].amount += 1;
      state.allCost = Big(state.allCost).plus(item.product.price).toNumber();
      state.allAmount += 1;
    },

    decrementCartItem(state, action: PayloadAction<ICartItem>) {
      const targetIndex = state.items.findIndex(
        (item) => item.product.id === action.payload.product.id
      );
      const item = state.items[targetIndex];
      if (item.amount === 1) {
        state.allCost = Big(state.allCost).minus(item.product.price).toNumber();
        state.allAmount -= 1;
        state.items.splice(targetIndex, 1);
      } else {
        state.items[targetIndex].allCost = Big(state.items[targetIndex].allCost)
          .minus(item.product.price)
          .toNumber();
        state.items[targetIndex].amount -= 1;
        state.allCost = Big(state.allCost).minus(item.product.price).toNumber();
        state.allAmount -= 1;
      }
    },
  },
});

export const { addCartItem, incrementCartItem, decrementCartItem } =
  cartSlice.actions;

export default cartSlice.reducer;
