// ============================================================
// CART SLICE
// Manages shopping cart state with Redux Toolkit
// ============================================================

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from './index';
import type { CartItem, CartState } from '../types';
import type { Product } from '../types';

const initialState: CartState = {
  items: [],
  isOpen: false
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    // Add product to cart; if already exists, increment quantity
    addToCart: (state, action: PayloadAction<Product>) => {
      const existingItem = state.items.find(
        (item) => item.product.id === action.payload.id
      );
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ product: action.payload, quantity: 1 });
      }
      state.isOpen = true; // Auto-open cart when item added
    },

    // Remove a product from cart by its ID
    removeFromCart: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(
        (item) => item.product.id !== action.payload
      );
    },

    // Update quantity of a specific cart item
    updateQuantity: (
    state,
    action: PayloadAction<{id: string;quantity: number;}>) =>
    {
      const item = state.items.find(
        (item) => item.product.id === action.payload.id
      );
      if (item) {
        if (action.payload.quantity <= 0) {
          // Remove item if quantity drops to 0
          state.items = state.items.filter(
            (i) => i.product.id !== action.payload.id
          );
        } else {
          item.quantity = action.payload.quantity;
        }
      }
    },

    // Clear all items from cart
    clearCart: (state) => {
      state.items = [];
    },

    // Toggle cart sidebar open/close
    toggleCart: (state) => {
      state.isOpen = !state.isOpen;
    },

    // Open cart sidebar
    openCart: (state) => {
      state.isOpen = true;
    },

    // Close cart sidebar
    closeCart: (state) => {
      state.isOpen = false;
    }
  }
});

export const {
  addToCart,
  removeFromCart,
  updateQuantity,
  clearCart,
  toggleCart,
  openCart,
  closeCart
} = cartSlice.actions;

// ---- SELECTORS ----

// Get all cart items
export const selectCartItems = (state: RootState): CartItem[] =>
state.cart.items;

// Calculate total price of all items in cart
export const selectCartTotal = (state: RootState): number =>
state.cart.items.reduce(
  (total, item) => total + item.product.price * item.quantity,
  0
);

// Get total number of items (sum of quantities)
export const selectCartCount = (state: RootState): number =>
state.cart.items.reduce((count, item) => count + item.quantity, 0);

// Check if cart sidebar is open
export const selectIsCartOpen = (state: RootState): boolean => state.cart.isOpen;

export default cartSlice.reducer;