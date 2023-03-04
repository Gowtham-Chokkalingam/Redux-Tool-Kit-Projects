import { configureStore } from "@reduxjs/toolkit";
import { cartReducer } from "./Features/cart/cartSlice";
import modalReudcer from "./Features/modal/modalSlice";

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    modal: modalReudcer,
  },
});
