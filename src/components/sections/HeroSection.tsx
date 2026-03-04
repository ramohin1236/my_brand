"use client";

import React, { useEffect, useState, useRef } from 'react';
// ============================================================
// HERO SECTION — Fade-in image slider (Bangladesh edition)
// Composes: HeroSlide + HeroContent + HeroSliderDots
// ============================================================

import { AnimatePresence, motion, useScroll, useTransform } from 'framer-motion';
import { HeroSlide } from './hero/HeroSlide';
import { HeroContent } from './hero/HeroContent';
import { HeroSliderDots } from './hero/HeroSliderDots';
import type { HeroSlideData } from './hero/HeroSlide';
const SLIDES: HeroSlideData[] = [
  {
    id: 0,
    image:
      'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1600&q=80',
    alt: 'Luxury cane sofa collection'
  },
  {
    id: 1,
    image:
      'https://images.unsplash.com/photo-1540574163026-643ea20ade25?w=1600&q=80',
    alt: 'Handcrafted oak dining table'
  },
  {
    id: 2,
    image:
      'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=1600&q=80',
    alt: 'Natural bamboo collection'
  }];

const INTERVAL_MS = 5000;
export function HeroSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start']
  });
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '15%']);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((i) => (i + 1) % SLIDES.length);
    }, INTERVAL_MS);
    return () => clearInterval(timer);
  }, []);
  return (
    <section
      ref={containerRef}
      className="relative h-screen min-h-[600px] max-h-[900px] overflow-hidden bg-forest"
      aria-label="Hero section">

      {/* Fade-in image slider */}
      <AnimatePresence initial={false}>
        <HeroSlide key={activeIndex} slide={SLIDES[activeIndex]} />
      </AnimatePresence>

      {/* Parallax content */}
      <motion.div
        style={{
          y: contentY,
          opacity
        }}
        className="absolute inset-0">

        <HeroContent />
      </motion.div>

      {/* Slide dots */}
      <HeroSliderDots
        count={SLIDES.length}
        active={activeIndex}
        onSelect={setActiveIndex} />


      {/* Scroll indicator */}
      <motion.div
        initial={{
          opacity: 0
        }}
        animate={{
          opacity: 1
        }}
        transition={{
          delay: 1.5
        }}
        className="absolute bottom-8 right-8 z-20 flex flex-col items-center gap-2">

        <span className="text-xs font-body text-white/50 tracking-widest uppercase">
          Scroll
        </span>
        <motion.div
          animate={{
            y: [0, 8, 0]
          }}
          transition={{
            repeat: Infinity,
            duration: 1.5
          }}
          className="w-0.5 h-8 bg-gradient-to-b from-white/50 to-transparent" />

      </motion.div>
    </section>);

}