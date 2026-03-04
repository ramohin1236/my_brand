"use client";

import React, { useEffect, useState } from 'react';
// ============================================================
// FLASH DEALS SECTION
// Time-limited deals with countdown timer
// ============================================================
import { motion } from 'framer-motion';
import { ZapIcon } from 'lucide-react';
import productsData from '../../data/products.json';
import { ProductCard } from '../ui/ProductCard';
import type { Product } from '../../types';
const products = productsData as Product[];
// Countdown hook
function useCountdown(targetHours: number = 8) {
  const [timeLeft, setTimeLeft] = useState({
    hours: targetHours,
    minutes: 23,
    seconds: 47
  });
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        let { hours, minutes, seconds } = prev;
        if (seconds > 0) {
          seconds -= 1;
        } else if (minutes > 0) {
          minutes -= 1;
          seconds = 59;
        } else if (hours > 0) {
          hours -= 1;
          minutes = 59;
          seconds = 59;
        }
        return {
          hours,
          minutes,
          seconds
        };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);
  return timeLeft;
}
// Countdown digit component
function CountdownUnit({ value, label }: { value: number; label: string; }) {
  return (
    <div className="flex flex-col items-center">
      <motion.div
        key={value}
        initial={{
          rotateX: -90,
          opacity: 0
        }}
        animate={{
          rotateX: 0,
          opacity: 1
        }}
        transition={{
          duration: 0.3
        }}
        className="bg-forest text-white font-heading text-2xl font-bold w-14 h-14 flex items-center justify-center rounded-lg shadow-inner">

        {String(value).padStart(2, '0')}
      </motion.div>
      <span className="text-xs font-body text-gray-500 mt-1.5 uppercase tracking-wider">
        {label}
      </span>
    </div>);

}
export function FlashDeals() {
  const { hours, minutes, seconds } = useCountdown(8);
  const flashDeals = products.filter((p) => p.isFlashDeal);
  return (
    <section className="py-20 bg-forest" aria-labelledby="flash-deals-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={{
            opacity: 0,
            y: 20
          }}
          whileInView={{
            opacity: 1,
            y: 0
          }}
          viewport={{
            once: true
          }}
          transition={{
            duration: 0.6
          }}
          className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-6">

          <div>
            <div className="flex items-center gap-2 mb-3">
              <ZapIcon className="w-5 h-5 text-orange fill-orange" />
              <p className="text-orange font-body text-sm font-semibold tracking-widest uppercase">
                Limited Time Only
              </p>
            </div>
            <h2
              id="flash-deals-heading"
              className="font-heading text-4xl md:text-5xl font-bold text-white">

              Flash Deals
            </h2>
          </div>

          {/* Countdown timer */}
          <div>
            <p className="text-white/60 font-body text-xs uppercase tracking-wider mb-3 text-center md:text-right">
              Deals end in
            </p>
            <div className="flex items-center gap-3">
              <CountdownUnit value={hours} label="Hours" />
              <span className="font-heading text-2xl font-bold text-white/40 mb-4">
                :
              </span>
              <CountdownUnit value={minutes} label="Mins" />
              <span className="font-heading text-2xl font-bold text-white/40 mb-4">
                :
              </span>
              <CountdownUnit value={seconds} label="Secs" />
            </div>
          </div>
        </motion.div>

        {/* Flash deal products */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {flashDeals.map((product, index) =>
            <ProductCard key={product.id} product={product} index={index} />
          )}
        </div>
      </div>
    </section>);

}