import React from 'react';
// ============================================================
// SKELETON CARD COMPONENT
// Loading placeholder for product cards
// ============================================================

export function SkeletonCard() {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-card animate-pulse">
      {/* Image placeholder */}
      <div className="skeleton h-64 w-full bg-gray-200" />

      <div className="p-4 space-y-3">
        {/* Category tag */}
        <div className="skeleton h-4 w-16 rounded bg-gray-200" />

        {/* Product name */}
        <div className="skeleton h-5 w-3/4 rounded bg-gray-200" />
        <div className="skeleton h-5 w-1/2 rounded bg-gray-200" />

        {/* Rating */}
        <div className="flex gap-1">
          {[...Array(5)].map((_, i) =>
          <div key={i} className="skeleton h-4 w-4 rounded bg-gray-200" />
          )}
          <div className="skeleton h-4 w-12 rounded bg-gray-200 ml-1" />
        </div>

        {/* Price */}
        <div className="flex items-center gap-2">
          <div className="skeleton h-6 w-20 rounded bg-gray-200" />
          <div className="skeleton h-4 w-16 rounded bg-gray-200" />
        </div>

        {/* Button */}
        <div className="skeleton h-10 w-full rounded bg-gray-200" />
      </div>
    </div>);

}
// Skeleton for a list row (used in cart, checkout)
export function SkeletonRow() {
  return (
    <div className="flex items-center gap-4 p-4 animate-pulse">
      <div className="skeleton h-16 w-16 rounded bg-gray-200 flex-shrink-0" />
      <div className="flex-1 space-y-2">
        <div className="skeleton h-4 w-3/4 rounded bg-gray-200" />
        <div className="skeleton h-4 w-1/2 rounded bg-gray-200" />
      </div>
      <div className="skeleton h-6 w-16 rounded bg-gray-200" />
    </div>);

}