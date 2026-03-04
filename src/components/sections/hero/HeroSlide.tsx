"use client";

import React from 'react';
// ============================================================
// HERO SLIDE — single slide item (image + overlay)
// ============================================================

import { motion } from 'framer-motion';
export interface HeroSlideData {
  id: number;
  image: string;
  alt: string;
}
interface HeroSlideProps {
  slide: HeroSlideData;
}
export function HeroSlide({ slide }: HeroSlideProps) {
  return (
    <motion.div
      key={slide.id}
      className="absolute inset-0"
      initial={{
        opacity: 0
      }}
      animate={{
        opacity: 1
      }}
      exit={{
        opacity: 0
      }}
      transition={{
        duration: 1.2,
        ease: 'easeInOut'
      }}>

      <img
        src={slide.image}
        alt={slide.alt}
        className="w-full h-full object-cover scale-105"
        style={{
          animation: 'subtleZoom 8s ease-in-out infinite alternate'
        }} />

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-forest/90 via-forest/60 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-forest/40 via-transparent to-transparent" />
    </motion.div>);

}