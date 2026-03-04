"use client";

import React, { Fragment } from 'react';
// ============================================================
// HERO CONTENT — animated text + CTAs
// ============================================================

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRightIcon, LeafIcon } from 'lucide-react';
const STATS = [
  {
    value: '৫০০+',
    label: 'Unique Pieces'
  },
  {
    value: '১৫+',
    label: 'Years of Craft'
  },
  {
    value: '১০K+',
    label: 'Happy Homes'
  }];

export function HeroContent() {
  return (
    <div className="relative z-10 h-full flex items-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="max-w-2xl">
          <motion.div
            initial={{
              opacity: 0,
              y: 20
            }}
            animate={{
              opacity: 1,
              y: 0
            }}
            transition={{
              duration: 0.6,
              delay: 0.2
            }}
            className="flex items-center gap-2 mb-6">

            <LeafIcon className="w-4 h-4 text-orange" />
            <span className="text-orange font-body text-sm font-semibold tracking-widest uppercase">
              Sustainably Crafted in Bangladesh
            </span>
          </motion.div>

          <motion.h1
            initial={{
              opacity: 0,
              y: 30
            }}
            animate={{
              opacity: 1,
              y: 0
            }}
            transition={{
              duration: 0.7,
              delay: 0.3
            }}
            className="font-heading text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6">

            Where Nature
            <br />
            <span className="text-orange italic">Meets Craft</span>
          </motion.h1>

          <motion.p
            initial={{
              opacity: 0,
              y: 20
            }}
            animate={{
              opacity: 1,
              y: 0
            }}
            transition={{
              duration: 0.6,
              delay: 0.5
            }}
            className="font-body text-lg text-white/80 leading-relaxed mb-10 max-w-lg">

            Discover handcrafted wood, bamboo & cane furniture — delivered
            across Bangladesh.
          </motion.p>

          <motion.div
            initial={{
              opacity: 0,
              y: 20
            }}
            animate={{
              opacity: 1,
              y: 0
            }}
            transition={{
              duration: 0.6,
              delay: 0.65
            }}
            className="flex flex-wrap gap-4">

            <Link
              href="/products"
              className="inline-flex items-center gap-2 bg-orange text-white font-body font-semibold text-base px-8 py-4 rounded hover:bg-orange-dark transition-colors group">

              Shop Collection
              <ArrowRightIcon className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/about"
              className="px-8 py-4 text-base font-body font-medium text-white border-2 border-white/40 rounded hover:border-white hover:bg-white/10 transition-all">

              Our Story
            </Link>
          </motion.div>

          <motion.div
            initial={{
              opacity: 0
            }}
            animate={{
              opacity: 1
            }}
            transition={{
              duration: 0.8,
              delay: 0.9
            }}
            className="flex flex-wrap gap-8 mt-14">

            {STATS.map((stat, i) =>
              <Fragment key={stat.label}>
                {i > 0 && <div className="w-px bg-white/20" />}
                <div>
                  <p className="font-heading text-3xl font-bold text-white">
                    {stat.value}
                  </p>
                  <p className="text-xs font-body text-white/60 uppercase tracking-wider mt-1">
                    {stat.label}
                  </p>
                </div>
              </Fragment>
            )}
          </motion.div>
        </div>
      </div>
    </div>);

}