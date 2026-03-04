"use client";

import React from 'react';
// ============================================================
// REVIEW CARD — displays a single customer review
// ============================================================

import { motion } from 'framer-motion';
import { CheckCircleIcon, MapPinIcon } from 'lucide-react';
import { StarRating } from './StarRating';
import type { Review } from '../../store/reviewSlice';
interface ReviewCardProps {
  review: Review;
  index?: number;
}
export function ReviewCard({ review, index = 0 }: ReviewCardProps) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 16
      }}
      animate={{
        opacity: 1,
        y: 0
      }}
      transition={{
        duration: 0.4,
        delay: index * 0.08
      }}
      className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-card">

      <div className="flex items-start justify-between gap-3 mb-3">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="font-heading text-sm font-bold text-gray-900 dark:text-white">
              {review.authorName}
            </span>
            {review.verified &&
              <span className="flex items-center gap-1 text-xs font-body text-green-600 dark:text-green-400">
                <CheckCircleIcon className="w-3.5 h-3.5" /> Verified
              </span>
            }
          </div>
          <div className="flex items-center gap-1.5 text-xs font-body text-gray-400">
            <MapPinIcon className="w-3 h-3" />
            {review.authorLocation}
          </div>
        </div>
        <span className="text-xs font-body text-gray-400 flex-shrink-0">
          {review.date}
        </span>
      </div>

      <StarRating value={review.rating} readonly size="sm" />

      <h4 className="font-heading text-sm font-semibold text-gray-900 dark:text-white mt-2 mb-1">
        "{review.title}"
      </h4>
      <p className="font-body text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
        {review.body}
      </p>

      {review.images.length > 0 &&
        <div className="flex gap-2 mt-3">
          {review.images.map((img, i) =>
            <img
              key={i}
              src={img}
              alt="Review"
              className="w-16 h-16 rounded-lg object-cover" />

          )}
        </div>
      }
    </motion.div>);

}