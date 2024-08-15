import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
  name: "products",
  initialState: [],
  reducers: {
    setProducts: (state, action) => action.payload,
    incrementQuantity: (state, action) => {
      const product = state.find((p) => p.id === action.payload);
      if (product) {
        product.quantity += 1;
      }
    },
    decrementQuantity: (state, action) => {
      const product = state.find((p) => p.id === action.payload);
      if (product && product.quantity > 0) {
        product.quantity -= 1;
      }
    },
  },
});

export const { setProducts, incrementQuantity, decrementQuantity } =
  productSlice.actions;
export default productSlice.reducer;
