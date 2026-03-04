"use client";

import React from 'react';
// ============================================================
// INSTAGRAM GRID SECTION
// Masonry-style photo grid with hover overlay
// ============================================================

import { motion } from 'framer-motion';
import { InstagramIcon, HeartIcon, MessageCircleIcon } from 'lucide-react';
const INSTAGRAM_POSTS = [
  {
    id: 1,
    image:
      'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&q=80',
    likes: 1243,
    comments: 47,
    alt: 'Cane sofa in living room'
  },
  {
    id: 2,
    image:
      'https://images.unsplash.com/photo-1540574163026-643ea20ade25?w=600&q=80',
    likes: 892,
    comments: 31,
    alt: 'Oak dining table setup'
  },
  {
    id: 3,
    image:
      'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=600&q=80',
    likes: 2104,
    comments: 88,
    alt: 'Bamboo basket collection'
  },
  {
    id: 4,
    image:
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&q=80',
    likes: 756,
    comments: 22,
    alt: 'Walnut bookshelf styling'
  },
  {
    id: 5,
    image:
      'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=600&q=80',
    likes: 1567,
    comments: 63,
    alt: 'Teak bed frame bedroom'
  },
  {
    id: 6,
    image:
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80',
    likes: 934,
    comments: 41,
    alt: 'Bamboo pendant lamp'
  }];

export function InstagramGrid() {
  return (
    <section className="py-20 bg-white" aria-labelledby="instagram-heading">
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
          className="text-center mb-12">

          <div className="flex items-center justify-center gap-2 mb-3">
            <InstagramIcon className="w-5 h-5 text-orange" />
            <p className="text-orange font-body text-sm font-semibold tracking-widest uppercase">
              @naturecraft.in
            </p>
          </div>
          <h2
            id="instagram-heading"
            className="font-heading text-4xl md:text-5xl font-bold text-forest mb-4">

            Life with NatureCraft
          </h2>
          <p className="font-body text-gray-500 max-w-md mx-auto">
            Tag us in your home photos for a chance to be featured. Use{' '}
            <span className="font-semibold text-forest">#NatureCraftHome</span>
          </p>
        </motion.div>

        {/* Instagram grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
          {INSTAGRAM_POSTS.map((post, index) =>
            <motion.a
              key={post.id}
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              initial={{
                opacity: 0,
                scale: 0.95
              }}
              whileInView={{
                opacity: 1,
                scale: 1
              }}
              viewport={{
                once: true
              }}
              transition={{
                duration: 0.4,
                delay: index * 0.07
              }}
              className="relative group overflow-hidden rounded-xl aspect-square block"
              aria-label={`View Instagram post: ${post.alt}`}>

              <img
                src={post.image}
                alt={post.alt}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />


              {/* Hover overlay */}
              <div className="absolute inset-0 bg-forest/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <div className="flex items-center gap-6 text-white">
                  <div className="flex items-center gap-2">
                    <HeartIcon className="w-5 h-5 fill-current" />
                    <span className="font-body font-semibold text-sm">
                      {post.likes.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MessageCircleIcon className="w-5 h-5 fill-current" />
                    <span className="font-body font-semibold text-sm">
                      {post.comments}
                    </span>
                  </div>
                </div>
              </div>
            </motion.a>
          )}
        </div>

        {/* Follow CTA */}
        <motion.div
          initial={{
            opacity: 0
          }}
          whileInView={{
            opacity: 1
          }}
          viewport={{
            once: true
          }}
          className="text-center mt-10">

          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 border-2 border-forest text-forest font-body font-semibold text-sm px-6 py-3 rounded hover:bg-forest hover:text-white transition-all group">

            <InstagramIcon className="w-4 h-4" />
            Follow @naturecraft.in
          </a>
        </motion.div>
      </div>
    </section>);

}