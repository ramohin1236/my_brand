"use client";

import React, { useRef } from 'react';
// ============================================================
// TESTIMONIALS — shows only latest 5-star reviews from Redux
// ============================================================

import { motion, useInView } from 'framer-motion';
import { StarIcon, QuoteIcon } from 'lucide-react';
import { useAppSelector } from '../../store';
import { selectFiveStarReviews } from '../../store/reviewSlice';
export function Testimonials() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, {
    once: true,
    margin: '-80px'
  });
  const reviews = useAppSelector(selectFiveStarReviews).slice(0, 5);
  return (
    <section
      ref={ref}
      className="py-20 bg-forest overflow-hidden"
      aria-labelledby="testimonials-heading">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{
            opacity: 0,
            y: 20
          }}
          animate={
            isInView ?
              {
                opacity: 1,
                y: 0
              } :
              {}
          }
          transition={{
            duration: 0.6
          }}
          className="text-center mb-14">

          <p className="text-orange font-body text-xs font-semibold uppercase tracking-widest mb-2">
            Verified Customers
          </p>
          <h2
            id="testimonials-heading"
            className="font-heading text-4xl font-bold text-white">

            What Our Customers Say
          </h2>
          <p className="font-body text-white/60 mt-3 text-sm">
            Only our 5-star reviews — because quality speaks for itself.
          </p>
        </motion.div>

        {/* Review cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((review, i) =>
            <motion.div
              key={review.id}
              initial={{
                opacity: 0,
                y: 24
              }}
              animate={
                isInView ?
                  {
                    opacity: 1,
                    y: 0
                  } :
                  {}
              }
              transition={{
                duration: 0.5,
                delay: i * 0.1
              }}
              className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/10">

              <QuoteIcon className="w-6 h-6 text-orange mb-3 opacity-60" />
              <div className="flex mb-2">
                {[...Array(5)].map((_, s) =>
                  <StarIcon
                    key={s}
                    className="w-4 h-4 text-amber-400 fill-amber-400" />

                )}
              </div>
              <h4 className="font-heading text-sm font-bold text-white mb-2">
                "{review.title}"
              </h4>
              <p className="font-body text-sm text-white/70 leading-relaxed mb-4 line-clamp-3">
                {review.body}
              </p>
              <div className="flex items-center gap-3 pt-3 border-t border-white/10">
                <div className="w-8 h-8 rounded-full bg-orange/30 flex items-center justify-center text-white font-heading font-bold text-sm">
                  {review.authorName.charAt(0)}
                </div>
                <div>
                  <p className="font-body text-xs font-semibold text-white">
                    {review.authorName}
                  </p>
                  <p className="font-body text-xs text-white/50">
                    {review.authorLocation}
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </section>);

}