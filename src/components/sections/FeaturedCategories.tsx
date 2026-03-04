"use client";

import React from 'react';
// ============================================================
// FEATURED CATEGORIES SECTION
// Three category cards with hover effects
// ============================================================

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRightIcon } from 'lucide-react';
const CATEGORY_DATA = [
  {
    name: 'Wood',
    tagline: 'Solid & Timeless',
    description:
      'Handcrafted from sustainably sourced hardwoods. Each grain tells a story.',
    image:
      'https://images.unsplash.com/photo-1540574163026-643ea20ade25?w=800&q=80',
    href: '/category/wood',
    count: '48 pieces',
    accent: 'from-forest/80'
  },
  {
    name: 'Bamboo',
    tagline: 'Light & Sustainable',
    description:
      'Eco-certified bamboo pieces that bring organic warmth to modern spaces.',
    image:
      'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=800&q=80',
    href: '/category/bamboo',
    count: '36 pieces',
    accent: 'from-forest/80'
  },
  {
    name: 'Cane',
    tagline: 'Woven & Elegant',
    description:
      'Hand-woven cane furniture that bridges colonial heritage with contemporary living.',
    image:
      'https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=800&q=80',
    href: '/category/cane',
    count: '29 pieces',
    accent: 'from-forest/80'
  }];

export function FeaturedCategories() {
  return (
    <section className="py-20 bg-cream" aria-labelledby="categories-heading">
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
          className="text-center mb-14">

          <p className="text-orange font-body text-sm font-semibold tracking-widest uppercase mb-3">
            Our Collections
          </p>
          <h2
            id="categories-heading"
            className="font-heading text-4xl md:text-5xl font-bold text-forest mb-4">

            Shop by Material
          </h2>
          <p className="font-body text-gray-500 max-w-lg mx-auto">
            Three distinct material families, each with its own character and
            craftsmanship tradition.
          </p>
        </motion.div>

        {/* Category grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {CATEGORY_DATA.map((category, index) =>
            <motion.div
              key={category.name}
              initial={{
                opacity: 0,
                y: 30
              }}
              whileInView={{
                opacity: 1,
                y: 0
              }}
              viewport={{
                once: true
              }}
              transition={{
                duration: 0.5,
                delay: index * 0.12
              }}>

              <Link href={category.href} className="block group">
                <div className="relative overflow-hidden rounded-xl h-[420px] shadow-card">
                  {/* Background image */}
                  <motion.img
                    src={category.image}
                    alt={`${category.name} furniture collection`}
                    className="absolute inset-0 w-full h-full object-cover"
                    whileHover={{
                      scale: 1.06
                    }}
                    transition={{
                      duration: 0.5
                    }} />


                  {/* Gradient overlay */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-t ${category.accent} via-transparent to-transparent opacity-70 group-hover:opacity-80 transition-opacity`} />


                  {/* Content */}
                  <div className="absolute inset-0 flex flex-col justify-end p-7">
                    <p className="text-xs font-body font-semibold text-orange uppercase tracking-widest mb-2">
                      {category.tagline}
                    </p>
                    <h3 className="font-heading text-3xl font-bold text-white mb-2">
                      {category.name}
                    </h3>
                    <p className="font-body text-sm text-white/80 leading-relaxed mb-4 max-w-xs">
                      {category.description}
                    </p>

                    <div className="flex items-center justify-between">
                      <span className="text-xs font-body text-white/60">
                        {category.count}
                      </span>
                      <motion.div
                        className="flex items-center gap-2 text-white font-body text-sm font-semibold"
                        whileHover={{
                          x: 4
                        }}
                        transition={{
                          duration: 0.2
                        }}>

                        Explore
                        <ArrowRightIcon className="w-4 h-4" />
                      </motion.div>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          )}
        </div>
      </div>
    </section>);

}