// ============================================================
// ORDER SLICE — tracks order history for review eligibility
// ============================================================

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from './index';
import type { CartItem } from '../types';

export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  district: string;
  date: string;
  status: 'processing' | 'shipped' | 'delivered';
}

interface OrderState {
  orders: Order[];
}

const initialState: OrderState = { orders: [] };

const orderSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    placeOrder: (
    state,
    action: PayloadAction<{
      items: CartItem[];
      total: number;
      district: string;
    }>) =>
    {
      state.orders.push({
        id: `NC${Math.floor(Math.random() * 90000) + 10000}`,
        items: action.payload.items,
        total: action.payload.total,
        district: action.payload.district,
        date: new Date().toISOString().split('T')[0],
        status: 'processing'
      });
    }
  }
});

export const { placeOrder } = orderSlice.actions;

export const selectOrders = (state: RootState) => state.orders.orders;
export const selectLatestOrder = (state: RootState) =>
state.orders.orders[state.orders.orders.length - 1] ?? null;

export default orderSlice.reducer;