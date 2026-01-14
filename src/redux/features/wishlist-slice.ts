import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type WishListItem = {
  id: number;
  title: string;
  price: number;
  discountedPrice: number;
  quantity: number;
  status?: string;
  imgs?: {
    thumbnails: string[];
    previews: string[];
  };
};

type InitialState = {
  items: WishListItem[];
};

// ✅ Load wishlist from localStorage on start
const loadWishlistFromLocalStorage = (): WishListItem[] => {
  if (typeof window !== "undefined") {
    try {
      const storedWishlist = localStorage.getItem("wishlistItems");
      if (storedWishlist) return JSON.parse(storedWishlist);
    } catch (err) {
      console.error("Failed to load wishlist from localStorage:", err);
    }
  }
  return [];
};

const initialState: InitialState = {
  items: loadWishlistFromLocalStorage(),
};

export const wishlist = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    addItemToWishlist: (state, action: PayloadAction<WishListItem>) => {
      const { id, title, price, quantity, imgs, discountedPrice, status } =
        action.payload;

      const existingItem = state.items.find((item) => item.id === id);

      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        state.items.push({
          id,
          title,
          price,
          quantity,
          imgs,
          discountedPrice,
          status,
        });
      }

      // ✅ Save to localStorage
      if (typeof window !== "undefined") {
        localStorage.setItem("wishlistItems", JSON.stringify(state.items));
      }
    },

    removeItemFromWishlist: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);

      if (typeof window !== "undefined") {
        localStorage.setItem("wishlistItems", JSON.stringify(state.items));
      }
    },

    removeAllItemsFromWishlist: (state) => {
      state.items = [];
      if (typeof window !== "undefined") {
        localStorage.removeItem("wishlistItems");
      }
    },
  },
});

export const {
  addItemToWishlist,
  removeItemFromWishlist,
  removeAllItemsFromWishlist,
} = wishlist.actions;

export default wishlist.reducer;
