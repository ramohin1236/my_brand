"use client";

import React, { useState } from 'react';
// ============================================================
// REVIEW FORM — submit a review after purchase (< 100 lines)
// ============================================================

import { useAppDispatch } from '../../store';
import { addReview } from '../../store/reviewSlice';
import { StarRating } from './StarRating';
import { Button } from '../ui/Button';
interface ReviewFormProps {
  productId: string;
  orderId: string;
  onSuccess?: () => void;
}
export function ReviewForm({ productId, orderId, onSuccess }: ReviewFormProps) {
  const dispatch = useAppDispatch();
  const [rating, setRating] = useState(5);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !body || !name) return;
    dispatch(
      addReview({
        productId,
        orderId,
        authorName: name,
        authorLocation: location,
        rating,
        title,
        body,
        images: []
      })
    );
    setSubmitted(true);
    onSuccess?.();
  };
  if (submitted) {
    return (
      <div className="text-center py-8">
        <p className="text-4xl mb-3">🎉</p>
        <p className="font-heading text-lg font-bold text-forest dark:text-white">
          Thank you for your review!
        </p>
        <p className="font-body text-sm text-gray-500 mt-1">
          Your feedback helps other customers.
        </p>
      </div>);

  }
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-xs font-body font-medium text-gray-700 dark:text-gray-300 mb-2">
          Your Rating
        </label>
        <StarRating value={rating} onChange={setRating} size="lg" />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your name *"
          required
          className="px-4 py-3 text-sm font-body border border-gray-200 dark:border-gray-600 rounded bg-white dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-forest/30" />

        <input
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="Your location (e.g. Dhaka)"
          className="px-4 py-3 text-sm font-body border border-gray-200 dark:border-gray-600 rounded bg-white dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-forest/30" />

      </div>
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Review title *"
        required
        className="w-full px-4 py-3 text-sm font-body border border-gray-200 dark:border-gray-600 rounded bg-white dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-forest/30" />

      <textarea
        value={body}
        onChange={(e) => setBody(e.target.value)}
        placeholder="Share your experience *"
        required
        rows={4}
        className="w-full px-4 py-3 text-sm font-body border border-gray-200 dark:border-gray-600 rounded bg-white dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-forest/30 resize-none" />

      <Button variant="primary" type="submit" fullWidth>
        Submit Review
      </Button>
    </form>);

}