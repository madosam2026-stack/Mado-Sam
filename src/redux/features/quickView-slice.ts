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
    imgs: { thumbnails: [], previews: [] }, // always provide default to avoid undefined
  },
};

const quickViewSlice = createSlice({
  name: "quickView",
  initialState,
  reducers: {
    updateQuickView: (state, action: PayloadAction<Product>) => {
      state.value = { ...action.payload };
      // ensure imgs always exists
      if (!state.value.imgs) {
        state.value.imgs = { thumbnails: [], previews: [] };
      }
    },
    resetQuickView: (state) => {
      state.value = initialState.value;
    },
  },
});

export const { updateQuickView, resetQuickView } = quickViewSlice.actions;
export default quickViewSlice.reducer;
