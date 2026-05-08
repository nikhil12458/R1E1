import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
  name: "product",
  initialState: {
    sellerProducts: [],
    products: [],
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
  },
});

export const { setSellerProducts, removeSellerProduct, setProducts } = productSlice.actions;
export default productSlice.reducer;