"use client";

import React from 'react';
// ============================================================
// HERO SLIDER DOTS — navigation indicators
// ============================================================

import { motion } from 'framer-motion';
interface HeroSliderDotsProps {
  count: number;
  active: number;
  onSelect: (index: number) => void;
}
export function HeroSliderDots({
  count,
  active,
  onSelect
}: HeroSliderDotsProps) {
  return (
    <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
      {Array.from({
        length: count
      }).map((_, i) =>
        <button
          key={i}
          onClick={() => onSelect(i)}
          aria-label={`Go to slide ${i + 1}`}
          className="relative h-2 rounded-full overflow-hidden transition-all duration-300"
          style={{
            width: i === active ? 24 : 8,
            background: 'rgba(255,255,255,0.35)'
          }}>

          {i === active &&
            <motion.span
              layoutId="activeDot"
              className="absolute inset-0 bg-orange rounded-full" />

          }
        </button>
      )}
    </div>);

}