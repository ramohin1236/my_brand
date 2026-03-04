// ============================================================
// REVIEW SLICE — manages product reviews state
// ============================================================

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from './index';
import seedReviews from '../data/reviews.json';

export interface Review {
  id: string;
  productId: string;
  orderId: string;
  authorName: string;
  authorLocation: string;
  rating: number;
  title: string;
  body: string;
  images: string[];
  date: string;
  verified: boolean;
}

interface ReviewState {
  reviews: Review[];
}

const initialState: ReviewState = {
  reviews: seedReviews as Review[]
};

const reviewSlice = createSlice({
  name: 'reviews',
  initialState,
  reducers: {
    addReview: (
    state,
    action: PayloadAction<Omit<Review, 'id' | 'date' | 'verified'>>) =>
    {
      const newReview: Review = {
        ...action.payload,
        id: `review-${Date.now()}`,
        date: new Date().toISOString().split('T')[0],
        verified: true
      };
      state.reviews.unshift(newReview);
    }
  }
});

export const { addReview } = reviewSlice.actions;

export const selectAllReviews = (state: RootState) => state.reviews.reviews;

export const selectFiveStarReviews = (state: RootState) =>
state.reviews.reviews.filter((r) => r.rating === 5);

export const selectReviewsByProduct =
(productId: string) => (state: RootState) =>
state.reviews.reviews.filter((r) => r.productId === productId);

export default reviewSlice.reducer;