import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  searchValue: 0,
};

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    searchProduct: (state, action) => {
      state.searchValue = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { searchProduct } = productSlice.actions;

export default productSlice.reducer;
