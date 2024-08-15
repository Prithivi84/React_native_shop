import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setProducts: (state, action) => {
      state.products = action.payload;
    },
    // incrementQuantity: (state, action) => {
    //   const product = state.products.find((p) => p.id === action.payload);
    //   if (product) {
    //     product.quantity += 1;
    //   }
    // },
    // decrementQuantity: (state, action) => {
    //   const product = state.products.find((p) => p.id === action.payload);
    //   if (product && product.quantity > 0) {
    //     product.quantity -= 1;
    //   }
    // },
  },
});

export const { setProducts } = productSlice.actions;
export default productSlice.reducer;
