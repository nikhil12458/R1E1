import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
  name: "product",
  initialState: {
    sellerProducts: [],
    products: [],
    selectedProduct: null,
  },
  reducers: {
    setSellerProducts: (state, action) => {
      state.sellerProducts = action.payload;
    },
    removeSellerProduct: (state, action) => {
      state.sellerProducts = state.sellerProducts.filter(
        (product) => product._id !== action.payload
      );
    },
    setProducts: (state, action) => {
      state.products = action.payload;
    },
    setSelectedProduct: (state, action) => {
      state.selectedProduct = action.payload;
    },
  },
});

export const {
  setSellerProducts,
  removeSellerProduct,
  setProducts,
  setSelectedProduct,
} = productSlice.actions;
export default productSlice.reducer;