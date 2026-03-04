"use client";

import React from 'react';
// ============================================================
// OUR STORY SECTION
// Brand story with image and text layout
// ============================================================

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRightIcon, AwardIcon, LeafIcon, UsersIcon } from 'lucide-react';
export function OurStory() {
  return (
    <section
      className="py-20 bg-cream overflow-hidden"
      aria-labelledby="story-heading">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Image side */}
          <motion.div
            initial={{
              opacity: 0,
              x: -40
            }}
            whileInView={{
              opacity: 1,
              x: 0
            }}
            viewport={{
              once: true
            }}
            transition={{
              duration: 0.7
            }}
            className="relative">

            {/* Main image */}
            <div className="relative rounded-2xl overflow-hidden shadow-luxury-lg">
              <img
                src="https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=800&q=80"
                alt="Artisan crafting furniture"
                className="w-full h-[500px] object-cover" />

              {/* Decorative overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-forest/30 to-transparent" />
            </div>

            {/* Floating stat card */}
            <motion.div
              initial={{
                opacity: 0,
                scale: 0.8
              }}
              whileInView={{
                opacity: 1,
                scale: 1
              }}
              viewport={{
                once: true
              }}
              transition={{
                duration: 0.5,
                delay: 0.4
              }}
              className="absolute -bottom-6 -right-6 bg-white rounded-xl shadow-luxury p-5 max-w-[180px]">

              <p className="font-heading text-3xl font-bold text-forest">15+</p>
              <p className="font-body text-sm text-gray-500 mt-1">
                Years of artisan craftsmanship
              </p>
            </motion.div>

            {/* Decorative green block */}
            <div className="absolute -top-4 -left-4 w-24 h-24 bg-forest/10 rounded-xl -z-10" />
          </motion.div>

          {/* Text side */}
          <motion.div
            initial={{
              opacity: 0,
              x: 40
            }}
            whileInView={{
              opacity: 1,
              x: 0
            }}
            viewport={{
              once: true
            }}
            transition={{
              duration: 0.7
            }}>

            <p className="text-orange font-body text-sm font-semibold tracking-widest uppercase mb-4">
              Our Heritage
            </p>
            <h2
              id="story-heading"
              className="font-heading text-4xl md:text-5xl font-bold text-forest mb-6 leading-tight">

              Rooted in Craft,
              <br />
              <span className="italic">Grown with Purpose</span>
            </h2>

            <p className="font-body text-gray-600 leading-relaxed mb-5">
              Founded in 2009 in the artisan heartland of Rajasthan, NatureCraft
              was born from a simple belief: that the most beautiful furniture
              comes from nature's own materials, shaped by human hands.
            </p>
            <p className="font-body text-gray-600 leading-relaxed mb-8">
              We work directly with master craftspeople who have inherited
              generations of knowledge. Every mortise, every weave, every finish
              is done by hand — because we believe that's the only way to create
              furniture that truly lasts.
            </p>

            {/* Values */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-10">
              <div className="flex flex-col items-start gap-2">
                <div className="w-10 h-10 bg-forest/10 rounded-lg flex items-center justify-center">
                  <LeafIcon className="w-5 h-5 text-forest" />
                </div>
                <h4 className="font-heading text-sm font-semibold text-forest">
                  Sustainable
                </h4>
                <p className="font-body text-xs text-gray-500">
                  All materials ethically sourced
                </p>
              </div>
              <div className="flex flex-col items-start gap-2">
                <div className="w-10 h-10 bg-forest/10 rounded-lg flex items-center justify-center">
                  <AwardIcon className="w-5 h-5 text-forest" />
                </div>
                <h4 className="font-heading text-sm font-semibold text-forest">
                  Certified
                </h4>
                <p className="font-body text-xs text-gray-500">
                  FSC & eco-certified products
                </p>
              </div>
              <div className="flex flex-col items-start gap-2">
                <div className="w-10 h-10 bg-forest/10 rounded-lg flex items-center justify-center">
                  <UsersIcon className="w-5 h-5 text-forest" />
                </div>
                <h4 className="font-heading text-sm font-semibold text-forest">
                  Artisan-Made
                </h4>
                <p className="font-body text-xs text-gray-500">
                  100+ skilled craftspeople
                </p>
              </div>
            </div>

            <Link
              href="/about"
              className="inline-flex items-center gap-2 bg-forest text-white font-body font-semibold text-sm px-6 py-3 rounded hover:bg-forest-light transition-colors group">

              Read Our Full Story
              <ArrowRightIcon className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>);

}