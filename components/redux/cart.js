import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const existingItem = state.cartItems.find(
        (item) => item.id === action.payload.id
      );
      if (existingItem) {
        existingItem.quantity = action.payload.quantity;
      } else {
        state.cartItems.push(action.payload);
      }
    },
    removeCart: (state, action) => {
      state.cartItems = state.cartItems.filter(
        (item) => item.id !== action.payload.id
      );
    },
    // updateCartQuantity: (state, action) => {
    //   const item = state.cartItems.find(
    //     (item) => item.id === action.payload.id
    //   );
    //   if (item) {
    //     item.quantity = action.payload.quantity;
    //     // return item;
    //   }
    // },
  },
});

export const { addToCart, removeCart } = cartSlice.actions;
export default cartSlice.reducer;
