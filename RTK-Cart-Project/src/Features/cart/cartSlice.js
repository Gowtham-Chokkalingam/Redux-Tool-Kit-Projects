import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import cartItems from "../../cartItems";

const url = `https://course-api.com/react-useReducer-cart-project`;

export const getCartItems = createAsyncThunk("cart/getCartItems", async () => {
  try {
    let resp = await fetch(url);
    let data = resp.json();
    return data;
  } catch (error) {
    console.log("error:", error);
  }
});

const initialState = {
  cartItems: [],
  amount: 1,
  total: 0,
  isLoading: true,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    clearCart: (state) => {
      state.cartItems = [];
    },
    removeItem: (state, action) => {
      const itemId = action.payload;
      state.cartItems = state.cartItems.filter((itm) => itm.id !== itemId);
    },
    increase: (state, { payload }) => {
      const cartItem = state.cartItems.find((item) => item.id === payload);
      cartItem.amount = cartItem.amount + 1;
    },
    decrease: (state, { payload }) => {
      const cartItem = state.cartItems.find((item) => item.id === payload);
      cartItem.amount = cartItem.amount - 1;
    },

    calculateTotals: (state) => {
      let amount = 0;
      let total = 0;

      state.cartItems.forEach((item) => {
        amount += item.amount;
        total += item.amount * item.price;
      });

      state.amount = amount;
      state.total = total;
    },
  },
  extraReducers: {
    [getCartItems.pending]: (state) => {
      state.isLoading = true;
    },
    [getCartItems.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.cartItems = action.payload;
    },
    [getCartItems.rejected]: (state) => {
      state.isLoading = false;
    },
  },
});

export const cartReducer = cartSlice.reducer;
export const { clearCart, removeItem, increase, decrease, calculateTotals } = cartSlice.actions;
