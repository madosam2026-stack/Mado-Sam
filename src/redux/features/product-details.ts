import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "@/types/product";

type InitialState = {
  value: Product;
};

const initialState: InitialState = {
  value: {
    id: 0,
    title: "",
    category: "",
    description: "",
    reviews: 0,
    gm: 0,
    price: 0,
    discountedPrice: 0,
    imgs: { thumbnails: [], previews: [] }, // always present
  },
};

export const productDetails = createSlice({
  name: "productDetails",
  initialState,
  reducers: {
    updateproductDetails: (state, action: PayloadAction<Product>) => {
      state.value = { ...action.payload };
      // ensure imgs always exists
      if (!state.value.imgs) {
        state.value.imgs = { thumbnails: [], previews: [] };
      }
    },
  },
});

export const { updateproductDetails } = productDetails.actions;
export default productDetails.reducer;

