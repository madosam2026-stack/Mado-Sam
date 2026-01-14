import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../types";

export type CartItem = {
  id: number;
  title: string;
  price: number;
  discountedPrice: number;
  quantity: number;
  gm: number;
  imgs?: {
    thumbnails: string[];
    previews: string[];
  };
};

type InitialState = {
  items: CartItem[];
};

// ✅ Load from localStorage on start
const loadCartFromLocalStorage = (): CartItem[] => {
  if (typeof window !== "undefined") {
    try {
      const storedCart = localStorage.getItem("cartItems");
      if (storedCart) return JSON.parse(storedCart);
    } catch (err) {
      console.error("Failed to load cart from localStorage:", err);
    }
  }
  return [];
};

const initialState: InitialState = {
  items: loadCartFromLocalStorage(),
};

export const cart = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItemToCart: (state, action: PayloadAction<CartItem>) => {
      const { id, title, price, quantity, gm, discountedPrice, imgs } =
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
          gm,
          discountedPrice,
          imgs,
        });
      }

      // ✅ Save to localStorage
      if (typeof window !== "undefined") {
        localStorage.setItem("cartItems", JSON.stringify(state.items));
      }
    },

    removeItemFromCart: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);

      if (typeof window !== "undefined") {
        localStorage.setItem("cartItems", JSON.stringify(state.items));
      }
    },

    updateCartItemQuantity: (
      state,
      action: PayloadAction<{ id: number; quantity: number }>
    ) => {
      const { id, quantity } = action.payload;
      const existingItem = state.items.find((item) => item.id === id);
      if (existingItem) existingItem.quantity = quantity;

      if (typeof window !== "undefined") {
        localStorage.setItem("cartItems", JSON.stringify(state.items));
      }
    },

    removeAllItemsFromCart: (state) => {
      state.items = [];

      if (typeof window !== "undefined") {
        localStorage.removeItem("cartItems");
      }
    },
  },
});

// ✅ Selectors
export const selectCartItems = (state: RootState) => state.cartReducer.items;

export const selectTotalPrice = createSelector([selectCartItems], (items) =>
  items.reduce((total, item) => total + item.discountedPrice * item.quantity, 0)
);

// ✅ Export actions
export const {
  addItemToCart,
  removeItemFromCart,
  updateCartItemQuantity,
  removeAllItemsFromCart,
} = cart.actions;

export default cart.reducer;
