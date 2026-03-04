"use client";

import React, { useState } from 'react';
// ============================================================
// STAR RATING — interactive + display star component
// ============================================================

import { StarIcon } from 'lucide-react';
interface StarRatingProps {
  value: number;
  onChange?: (rating: number) => void;
  size?: 'sm' | 'md' | 'lg';
  readonly?: boolean;
}
const SIZE_MAP = {
  sm: 'w-3.5 h-3.5',
  md: 'w-5 h-5',
  lg: 'w-7 h-7'
};
export function StarRating({
  value,
  onChange,
  size = 'md',
  readonly = false
}: StarRatingProps) {
  const [hovered, setHovered] = useState(0);
  const active = hovered || value;
  return (
    <div
      className="flex items-center gap-0.5"
      role={readonly ? undefined : 'radiogroup'}
      aria-label="Star rating">

      {[1, 2, 3, 4, 5].map((star) =>
        <button
          key={star}
          type="button"
          disabled={readonly}
          onClick={() => onChange?.(star)}
          onMouseEnter={() => !readonly && setHovered(star)}
          onMouseLeave={() => !readonly && setHovered(0)}
          aria-label={`${star} star${star > 1 ? 's' : ''}`}
          className={`transition-transform ${!readonly ? 'hover:scale-110 cursor-pointer' : 'cursor-default'} focus:outline-none`}>

          <StarIcon
            className={`${SIZE_MAP[size]} transition-colors ${star <= active ? 'text-amber-400 fill-amber-400' : 'text-gray-300 dark:text-gray-600'}`} />

        </button>
      )}
    </div>);

}