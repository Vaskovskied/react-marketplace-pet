import { getProductById } from "./../../utils/urlFunctions";
import { RootState } from "./../index";
import { ICart, ICartItem, IProduct } from "./../../models/models";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import Big from "big.js";
import axios from "axios";

const initialState: ICart = {
  items: [],
  allAmount: 0,
  allCost: 0,
  isLoading: false,
  error: null,
};

export const updateCart = createAsyncThunk<
  ICartItem[],
  undefined,
  {
    state: RootState;
    rejectValue: string;
  }
>("cart/updateCart", async function (_, { getState, rejectWithValue }) {
  const state = getState().cart;
  const updated: ICartItem[] = [];
  for (let i = 0; i < state.items.length; i++) {
    const item = state.items[i];
    const { data: resData } = await axios.get(getProductById(item.product.id));
    if (resData === "") {
      return rejectWithValue("Error 404: one of the products not found");
    }
    updated.push({
      product: resData as IProduct,
      amount: item.amount,
      allCost: Big(item.amount)
        .mul((resData as IProduct).price)
        .toNumber(),
    });
  }
  return updated;
});

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

    deleteProduct(state, action: PayloadAction<ICartItem>) {
      const targetIndex = state.items.findIndex(
        (item) => item.product.id === action.payload.product.id
      );
      state.allCost = Big(state.allCost)
        .minus(action.payload.allCost)
        .toNumber();
      state.allAmount -= action.payload.amount;
      state.items.splice(targetIndex, 1);
    },

    emtpyCart(state) {
      state.items = [];
      state.allAmount = 0;
      state.allCost = 0;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(updateCart.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(updateCart.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.error = null;
      state.items = payload;
      state.allCost = payload.reduce((prev, curr) => {
        return Big(prev).plus(curr.allCost).toNumber();
      }, 0);
    });
    builder.addCase(updateCart.rejected, (state, { payload }) => {
      state.isLoading = false;
      const errorMessage = payload === undefined ? "Unexpected error" : payload;
      state.error = errorMessage;
      console.error(errorMessage);
    });
  },
});

export const {
  addCartItem,
  incrementCartItem,
  decrementCartItem,
  deleteProduct,
  emtpyCart,
} = cartSlice.actions;

export default cartSlice.reducer;
