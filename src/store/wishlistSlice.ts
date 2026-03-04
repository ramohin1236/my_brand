// ============================================================
// WISHLIST SLICE
// Manages wishlist state with Redux Toolkit
// ============================================================

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from './index';
import type { WishlistItem, WishlistState } from '../types';
import type { Product } from '../types';

const initialState: WishlistState = {
  items: []
};

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {
    // Add a product to the wishlist
    addToWishlist: (state, action: PayloadAction<Product>) => {
      const exists = state.items.find(
        (item) => item.product.id === action.payload.id
      );
      if (!exists) {
        state.items.push({ product: action.payload });
      }
    },

    // Remove a product from wishlist by ID
    removeFromWishlist: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(
        (item) => item.product.id !== action.payload
      );
    },

    // Toggle: add if not present, remove if already in wishlist
    toggleWishlist: (state, action: PayloadAction<Product>) => {
      const existingIndex = state.items.findIndex(
        (item) => item.product.id === action.payload.id
      );
      if (existingIndex >= 0) {
        state.items.splice(existingIndex, 1);
      } else {
        state.items.push({ product: action.payload });
      }
    }
  }
});

export const { addToWishlist, removeFromWishlist, toggleWishlist } =
wishlistSlice.actions;

// ---- SELECTORS ----

// Get all wishlist items
export const selectWishlistItems = (state: RootState): WishlistItem[] =>
state.wishlist.items;

// Get count of wishlist items
export const selectWishlistCount = (state: RootState): number =>
state.wishlist.items.length;

// Check if a specific product is in the wishlist
export const selectIsInWishlist =
(id: string) =>
(state: RootState): boolean =>
state.wishlist.items.some((item) => item.product.id === id);

export default wishlistSlice.reducer;